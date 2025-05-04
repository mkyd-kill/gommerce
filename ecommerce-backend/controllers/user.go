package controllers

import (
	"net/http"
	"strings"
	"time"
	"os"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"ecommerce-backend/models"
	"ecommerce-backend/database"
	"ecommerce-backend/utils"
	"github.com/dgrijalva/jwt-go"
)

func Register(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Bad Request Error [User]": err.Error()})
		return
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	user.Password = string(hashedPassword)

	if err := database.DB.Create(&user).Error; err != nil {
		if strings.Contains(err.Error(), "duplicate") {
			c.JSON(http.StatusConflict, gin.H{"Database Error [User]": "Username or Email already exists"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"Server Error [User]": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"User Register Message": "User Registered"})
}

func Login(c *gin.Context) {
	var input models.User
	var user models.User

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Bad Request Error [User]": err.Error()})
		return
	}

	if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"Unauthorized Access": "Invalid Credentials"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"Unauthorized Access": "Invalid Credentials"})
		return
	}

	accessToken, _ := utils.GenerateToken(user.Username, user.Email, time.Minute*20)
	refreshToken, _ := utils.GenerateToken(user.Username, user.Email, time.Hour*24*7)

	c.JSON(http.StatusOK, gin.H{
		"token":	accessToken,
		"refresh":	refreshToken,
		"username":	user.Username,
		"email":	user.Email,
	})
}

func RefreshToken(c *gin.Context) {
	type RefreshRequest struct {
		Token string `json:"token"`
	}

	var req RefreshRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing refresh token"})
		return
	}

	tokenStr := req.Token
	claims := &utils.Claims{}

	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired refresh token"})
		return
	}

	// Issue a new access token
	newAccess, _ := utils.GenerateToken(claims.Username, claims.Email, time.Minute*15)
	newRefresh, _ := utils.GenerateToken(claims.Username, claims.Email, time.Hour*24*7)

	c.JSON(http.StatusOK, gin.H{
		"token":    newAccess,
		"refresh":  newRefresh,
		"username": claims.Username,
		"email":    claims.Email,
	})
}

func UpdateProfile(c *gin.Context) {
	var user models.User
	id := c.Param("id")

	if err := database.DB.First(&user, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User Not Found"})
		return
	}

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Save(&user)
	c.JSON(http.StatusOK, user)
}