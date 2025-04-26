package routes

import (
	"github.com/gin-gonic/gin"
	"ecommerce-backend/controllers"
)

func SetupRoutes(r *gin.Engine) {
	r.GET("/products", controllers.GetProducts)
}