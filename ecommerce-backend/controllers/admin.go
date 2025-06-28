package controllers

import (
	"ecommerce-backend/database"
	"ecommerce-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AdminStats(c *gin.Context) {
	var productCount int64
	var userCount int64

	database.DB.Model(&models.Product{}).Count(&productCount)
	database.DB.Model(&models.User{}).Count(&userCount)

	c.JSON(http.StatusOK, gin.H{
		"products": productCount,
		"users": userCount,
	})
}