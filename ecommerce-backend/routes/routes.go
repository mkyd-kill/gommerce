package routes

import (
	"ecommerce-backend/controllers"
	"ecommerce-backend/middleware"
	"ecommerce-backend/token"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	jwtMaker := token.NewJWTMaker()
	authMaker := middleware.GetAuthMiddlewareFunc(jwtMaker)
	adminAuthMaker := middleware.GetAdminMiddlewareFunc(jwtMaker)

	// product routes
	product := r.Group("/api/products")
	{
		product.GET("/", controllers.GetProducts)
		product.GET("get/:id", controllers.GetProduct)

		// set up private routes
		product.Use(adminAuthMaker)
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
		user.Use(authMaker)
		user.GET("profile", controllers.GetUserProfile)
		user.PATCH("update", controllers.UpdateProfile)
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