package main

import (
	"github.com/gin-gonic/gin"
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

	// loading routes
	routes.SetupRoutes(r)

	// running server
	r.Run(":8080")
}
