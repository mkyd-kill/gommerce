package config

import (
	"log"
	"os"
	"github.com/joho/godotenv"
)

func LoadEnv() {
	// Only load .env file if not in production
	if os.Getenv("GO_ENV") != "production" {
		if err := godotenv.Load(); err != nil {
			log.Println("No .env file found (ok in production)")
		}
	}
}

func GetEnv(key string) string {
	return os.Getenv(key)
}