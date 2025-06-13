package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	token "ecommerce-backend/utils"
)

func Authentication() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Missing Authorization Header"})
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid Authorization Header Format"})
			return
		}
		tokenString := parts[1]

		claims, err := token.ValidateToken(tokenString)
		if err != "" {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		c.Set("email", claims.Email)
		c.Set("user_role", claims.UserRole)
		c.Next()
	}
}