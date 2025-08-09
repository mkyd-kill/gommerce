package controllers

import (
	"ecommerce-backend/database"
	"ecommerce-backend/models"
	"ecommerce-backend/token"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
    var user models.User

    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
        return
    }
    user.Password = string(hashedPassword)
	user.UserRole = "USER"

    if err := database.DB.Create(&user).Error; err != nil {
        if strings.Contains(err.Error(), "duplicate") {
            c.JSON(http.StatusConflict, gin.H{"error": "Username or Email already exists"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{})
}

func Login(c *gin.Context) {
    var input models.User
    var user models.User

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Email not found"})
        return
    }

    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
        return
    }

	var tokenMaker token.JWTMaker
    accessToken, err := tokenMaker.CreateToken(user.ID, user.Email, user.UserRole, 20*time.Minute)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
        return
    }

	// cookie
	http.SetCookie(c.Writer, &http.Cookie{
		Name:		"auth-token",
		Value:		accessToken,
		Path:		"/",
		HttpOnly: 	false,
		SameSite:	http.SameSiteNoneMode,
		Secure:		true,
		Expires: 	time.Now().Add(time.Hour * 1),
	})
	
    c.JSON(http.StatusOK, gin.H{})
}

func Logout(c *gin.Context) {
	http.SetCookie(c.Writer, &http.Cookie{
		Name:		"auth-token",
		Value:		"",
		Path:		"/",
		HttpOnly: 	false,
		SameSite:	http.SameSiteNoneMode,
		Secure:		true,
		Expires: 	time.Now(),
	})
	c.JSON(http.StatusOK, gin.H{})
}

func GetUserProfile(c *gin.Context) {
	u, _ := c.Get("auth-user")

	var user models.User

	if err := database.DB.Where("email = ?", u.(*token.UserClaims).Email).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"Database Error": "User Not Found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func UpdateProfile(c *gin.Context) {
	u, _ := c.Get("auth-user")

	var user models.User

	if err := database.DB.First(&user, u.(*token.UserClaims).ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"Database Error": "User Not Found"})
		return
	}

	var input struct {
		Firstname   string `json:"firstname"`
		Lastname    string `json:"lastname"`
		PhoneNumber string `json:"phone_number"`
		Password    string `json:"newPassword"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update fields
	user.Firstname = input.Firstname
	user.Lastname = input.Lastname
	user.PhoneNumber = input.PhoneNumber

	// Update password only if provided
	if input.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), 14)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
			return
		}
		user.Password = string(hashedPassword)
	}

	if err := database.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}