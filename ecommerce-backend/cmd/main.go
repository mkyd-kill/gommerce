package main

import (
	"time"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"ecommerce-backend/routes"
	"ecommerce-backend/config"
	"ecommerce-backend/database"
)

func main() {
	// loading environment variables
	config.LoadEnv()

	// connecting to the database
	database.Connect()

	// router setup
	r := gin.Default()

	// cors middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins: 		[]string{config.GetEnv("NEXT_API_URL")},
		AllowMethods: 		[]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: 		[]string{
			"Origin",
			"Content-Type",
			"Authorization",
			"Accept",
			"Cookie",
			"X-Requested-With",
			"Access-Control-Allow-Headers",
		},
		ExposeHeaders: 		[]string{"Content-Length"},
		AllowCredentials: 	true,
		MaxAge: 			12 * time.Hour,
	}))

	// loading routes
	routes.SetupRoutes(r)

	// running server
	r.Run(":8080")
}
