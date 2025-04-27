package database

import (
	"fmt"
	"log"
	"os"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	// "ecommerce-backend/models"
)

var DB *gorm.DB

func Connect() {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASS"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// auto migration of models
	DB.AutoMigrate()

	// dummy product
	// DB.Create(&models.Product{
	// 	Name: "Women's Lingerie",
	// 	Description: "Comfortable and Stylish",
	// 	Price: 89.99,
	// 	Category: "Women's Clothing",
	// 	ImageURL: "https://example.com/lingerie.jpg",
	// 	Stock: 20,
	// })
}