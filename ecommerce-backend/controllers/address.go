package controllers

import (
	"ecommerce-backend/models"
	"github.com/gin-gonic/gin"
	"ecommerce-backend/database"
	"net/http"
)

func GetAddresses(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Getting all Addresses"})
}

func CreateAddress(c *gin.Context) {
	var address models.Address

	if err := c.ShouldBindJSON(&address); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Bad Request Error": err.Error()})
		return
	}

	if err := database.DB.Create(&address).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Server Error": "Could not save address"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Addresss Created Successfully"})
}

func UpdateAddress(c *gin.Context) {

}

func DeleteAddress(c *gin.Context) {

}