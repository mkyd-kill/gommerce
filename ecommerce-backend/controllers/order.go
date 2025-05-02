package controllers

import (
	"ecommerce-backend/database"
	"ecommerce-backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func CreateOrder(c *gin.Context) {
	var order models.Order

	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Bad Request Error": err.Error()})
		return
	}

	if err := database.DB.Create(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Server Error": "Could not save order"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Order Created Successfully"})
}

func GetOrderByUser(c *gin.Context) {
	userEmail := c.Query("email")

	if userEmail == "" {
		c.JSON(http.StatusBadRequest, gin.H{"Bad Request": "Email is required"})
		return 
	}

	var orders []models.Order
	if err := database.DB.Preload("Items").Where("user_email = ?", userEmail).Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Server Error": "Could not fetch orders"})
		return
	}

	c.JSON(http.StatusOK, orders)
}