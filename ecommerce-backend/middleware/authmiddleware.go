package middleware

import (
	"ecommerce-backend/token"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func GetAuthMiddlewareFunc(tokenMaker *token.JWTMaker) gin.HandlerFunc {
	return func(c *gin.Context) {
		// getting cookie of req
		authHeader, err := c.Cookie("auth-token")
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "authentication cookie missing or invalid"})
			return
		}

		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "authorization header missing"})
			return
		}

		claims, err := tokenMaker.VerifyToken(authHeader)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": fmt.Sprintf("token error: %v", err)})
			return
		}

		c.Set("auth-user", claims)
		c.Next()
	}
}

func GetAdminMiddlewareFunc(tokenMaker *token.JWTMaker) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "authorization header missing"})
			return
		}

		fields := strings.Fields(authHeader)
		if len(fields) != 2 || strings.ToLower(fields[0]) != "Bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization format"})
			return
		}

		tokenStr := fields[1]
		claims, err := tokenMaker.VerifyToken(tokenStr)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": fmt.Sprintf("token error: %v", err)})
			return
		}

		if claims.UserRole != "ADMIN" {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "superuser credentials required"})
		}

		c.Set("authUser", claims)
		c.Next()
	}
}