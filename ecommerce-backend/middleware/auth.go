package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Missing Authorization header"})
            return
        }

        parts := strings.Split(authHeader, " ")
        if len(parts) != 2 || parts[0] != "Bearer" {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid Authorization header format"})
            return
        }
        tokenString := parts[1]

        claims := &jwt.StandardClaims{}
        token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (any, error) {
            return []byte(os.Getenv("JWT_SECRET")), nil
        })

        if err != nil {
            if err == jwt.ErrSignatureInvalid {
                c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token signature"})
                return
            }
            if ve, ok := err.(*jwt.ValidationError); ok {
                if ve.Errors&jwt.ValidationErrorExpired != 0 {
                    c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Token has expired"})
                    return
                }
            }
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error1": "Invalid token"})
            return
        }
        if !token.Valid {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error2": "Invalid token"})
            return
        }

        c.Set("user_id", claims.Subject)
        c.Next()
    }
}