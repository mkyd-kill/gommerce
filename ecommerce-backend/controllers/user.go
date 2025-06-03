package controllers

import (
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"ecommerce-backend/models"
	"ecommerce-backend/database"
	"ecommerce-backend/utils"
	helper "ecommerce-backend/helpers"
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

	accessToken, _ := utils.GenerateToken(user.Username, user.Email, time.Minute * 20)

	c.JSON(http.StatusOK, gin.H{
		"user_id": 	user.ID,
		"username":	user.Username,
		"email":	user.Email,
		"role": 	user.UserRole,
		"token":	accessToken,
	})
}

func GetUserProfile(c *gin.Context) {
	userId := c.Param("user_id")

	if err := helper.MatchUserTypeToUid(c, userId); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User

	if err := database.DB.First(&user, userId).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"Database Error": "User Not Found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func UpdateProfile(c *gin.Context) {
	var user models.User
	user_id := c.Param("user_id")


	if err := database.DB.First(&user, user_id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"Database Error": "User Not Found"})
		return
	}

	var input struct {
		Firstname   string `json:"firstname"`
		Lastname    string `json:"lastname"`
		PhoneNumber string `json:"phoneNumber"`
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

	c.JSON(http.StatusOK, gin.H{
		"message": "Profile updated successfully",
		"user":    user,
	})
}