package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"ecommerce-backend/models"
	"ecommerce-backend/database"
)

func GetProducts(c *gin.Context) {
	var products []models.Product
	result := database.DB.Find(&products)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, products)
}