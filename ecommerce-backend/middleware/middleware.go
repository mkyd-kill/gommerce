package middleware

import (
	"net/http"
	token "ecommerce-backend/utils"
	"github.com/gin-gonic/gin"
)

func Authentication() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Missing Authorization Header"})
		}

		claims, err := token.ValidateToken(authHeader)
		if err != "" {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		c.Set("email", claims.Email)
		c.Set("user_role", claims.UserRole)
		c.Next()
	}
}