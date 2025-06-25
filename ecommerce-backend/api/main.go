package main

import (
	"time"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"ecommerce-backend/api/routes"
	"ecommerce-backend/api/config"
	"ecommerce-backend/api/database"
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
		AllowHeaders: 		[]string{"Allow-Origin", "Origin", "Content-Type", "Authorization", "Accept", "Cookie"},
		ExposeHeaders: 		[]string{"Content-Length"},
		AllowCredentials: 	true,
		MaxAge: 			12 * time.Hour,
	}))

	// loading routes
	routes.SetupRoutes(r)

	// running server
	r.Run(":8080")
}
