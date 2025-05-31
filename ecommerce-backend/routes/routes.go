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

		// private routes
		userRoutes.Use(middleware.AuthMiddleware())
		userRoutes.GET("profile/:user_id", controllers.GetUserProfile)
		userRoutes.PUT("profile-update/:user_id", controllers.UpdateProfile)
	}

	// user orders
	orderRoutes := r.Group("/api/order/")
	{
		orderRoutes.Use(middleware.AuthMiddleware())
		orderRoutes.POST("create-order", controllers.CreateOrder)
		orderRoutes.GET("", controllers.GetOrdersByUser)
	}

	// address routes
	addressRoutes := r.Group("/api/address/")
	{
		addressRoutes.GET("", controllers.GetAddresses)
		addressRoutes.POST("create-address", controllers.CreateAddress)
		addressRoutes.PUT("update-addresss/:address_id", controllers.UpdateAddress)
		addressRoutes.DELETE("delete-address/:address_id", controllers.DeleteAddress)
	}
}