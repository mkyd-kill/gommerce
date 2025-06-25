package controllers

import (
	"ecommerce-backend/database"
	"ecommerce-backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
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

func GetOrdersByUser(c *gin.Context) {
	userEmail := c.Query("email")
	page := c.DefaultQuery("page", "1")
	limit := c.DefaultQuery("limit", "5")

	if userEmail == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is required"})
		return
	}

	pageNum, _ := strconv.Atoi(page)
	limitNum, _ := strconv.Atoi(limit)
	offset := (pageNum - 1) * limitNum

	var orders []models.Order
	if err := database.DB.Preload("Items").
		Where("user_email = ?", userEmail).
		Order("created_at DESC").
		Limit(limitNum).Offset(offset).
		Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch orders"})
		return
	}

	c.JSON(http.StatusOK, orders)
}
