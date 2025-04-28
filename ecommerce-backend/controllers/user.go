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
)

func Register (c *gin.Context) {
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