package routes

import (
	"github.com/gin-gonic/gin"
	"ecommerce-backend/controllers"
)

func SetupRoutes(r *gin.Engine) {
	// product routes
	productRoutes := r.Group("/api/product/")
	{
		productRoutes.GET("all", controllers.GetProducts)
		productRoutes.GET("get/:id", controllers.GetProduct)
		productRoutes.POST("create", controllers.CreateProduct)
		productRoutes.PUT("update/:id", controllers.UpdateProduct)
		productRoutes.DELETE("delete/:id", controllers.DeleteProduct)
	}

	// user routes
	userRoutes := r.Group("/api/users/")
	{
		userRoutes.POST("register", controllers.Register)
		userRoutes.POST("login", controllers.Login)
	}
}