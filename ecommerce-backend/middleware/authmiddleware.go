package middleware

import (
	"ecommerce-backend/token"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func GetAuthMiddlewareFunc() gin.HandlerFunc {
	return func(c *gin.Context) {
		var tokenMaker *token.JWTMaker
		authHeader := c.GetHeader("Authorization")
		claims, err := verifyClaimsFromAuthHeader(authHeader, tokenMaker)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"Error Verifying Token": err})
			return
		}

		c.Set("authKey", claims)
	}
}

func verifyClaimsFromAuthHeader(authHeader string, tokenMaker *token.JWTMaker) (*token.UserClaims, error) {
	if authHeader == "" {
		return nil, fmt.Errorf("authorization header is missing")
	}

	fields := strings.Fields(authHeader)
	if len(fields) != 2 || fields[0] != "Bearer" {
		return nil, fmt.Errorf("invalid authorization header")
	}

	token := fields[1]
	claims, err := tokenMaker.VerifyToken(token)
	if err != nil {
		return nil, fmt.Errorf("invalid token: %w", err)
	}

	return claims, nil
}