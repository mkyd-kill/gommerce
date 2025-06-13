package utils

import (
	"os"
	"time"
	jwt "github.com/dgrijalva/jwt-go"
)

type SignedDetails struct {
	Email string
	Username string
	UserRole string
	jwt.StandardClaims
}

var SECRET_KEY = os.Getenv("SECRET_KEY")

func TokenGenerator(email string, username string, role string) (token string, err error) {
	claims := &SignedDetails{
		Email: email,
		Username: username,
		UserRole: role,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(2)).Unix(),
		},
	}

	token, err = jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(SECRET_KEY))

	return token, err
}

func ValidateToken(signedtoken string) (claims *SignedDetails, msg string) {
	token, err := jwt.ParseWithClaims(signedtoken, &SignedDetails{}, func(token *jwt.Token) (any, error) {
		return []byte(SECRET_KEY), nil
	})

	if err != nil {
		msg = err.Error()
		return
	}
	
	claims, ok := token.Claims.(*SignedDetails)
	if !ok {
		msg = "Invalid Token"
		return
	}

	if claims.ExpiresAt < time.Now().Unix() {
		msg = "Token has Expired"
		return
	}

	return claims, msg
}

