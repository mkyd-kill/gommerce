package routes

import (
	"github.com/gin-gonic/gin"
	"ecommerce-backend/controllers"
)

func SetupRoutes(r *gin.Engine) {
	// product routes
	product := r.Group("/api/products")
	{
		product.GET("/", controllers.GetProducts)
		product.GET("get/:id", controllers.GetProduct)

		// set up private routes
		product.POST("create", controllers.CreateProduct)
		product.PATCH("update/:id", controllers.UpdateProduct)
		product.DELETE("delete/:id", controllers.DeleteProduct)
	}

	// user routes
	user := r.Group("/api/user/")
	{
		user.POST("register", controllers.Register)
		user.POST("login", controllers.Login)

		// private routes
		user.GET("profile/:user_id", controllers.GetUserProfile)
		user.PATCH("profile-update/:user_id", controllers.UpdateProfile)
	}

	// user orders
	order := r.Group("/api/orders")
	{
		order.POST("create-order", controllers.CreateOrder)
		order.GET("/", controllers.GetOrdersByUser)
	}

	// address routes
	address := r.Group("/api/address")
	{
		address.GET("/", controllers.GetAddresses)
		address.POST("create", controllers.CreateAddress)
		address.PATCH("update/:address_id", controllers.UpdateAddress)
		address.DELETE("delete/:address_id", controllers.DeleteAddress)
	}
}