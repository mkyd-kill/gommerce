package routes

import (
	"github.com/gin-gonic/gin"
	"ecommerce-backend/controllers"
	"ecommerce-backend/middleware"
)

func SetupRoutes(r *gin.Engine) {
	// product routes
	productRoutes := r.Group("/api/product/")
	{
		productRoutes.GET("all", controllers.GetProducts)
		productRoutes.GET("get/:id", controllers.GetProduct)

		// set up private routes
		productRoutes.Use(middleware.AuthMiddleware())
		productRoutes.POST("create", controllers.CreateProduct)
		productRoutes.PUT("update/:id", controllers.UpdateProduct)
		productRoutes.DELETE("delete/:id", controllers.DeleteProduct)
	}

	// user routes
	userRoutes := r.Group("/api/user/")
	{
		userRoutes.POST("register", controllers.Register)
		userRoutes.POST("login", controllers.Login)
		userRoutes.POST("refresh", controllers.RefreshToken)
	}

	// user order
	orderRoutes := r.Group("/order/")
	{
		orderRoutes.Use(middleware.AuthMiddleware())
		orderRoutes.POST("create", controllers.CreateOrder)
		orderRoutes.GET("")
	}
}