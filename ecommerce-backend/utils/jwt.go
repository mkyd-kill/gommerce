package utils

import (
    "time"
    "os"
    jwt "github.com/dgrijalva/jwt-go"
)

var jwtKey = []byte(os.Getenv("JWT_SECRET"))

type Claims struct {
    Username string `json:"username"`
    Email    string `json:"email"`
    jwt.StandardClaims
}

func GenerateToken(username string, email string, duration time.Duration) (string, error) {
    claims := &Claims{
        Username: username,
        Email:    email,
        StandardClaims: jwt.StandardClaims{
            Subject:   email,
            ExpiresAt: time.Now().Add(duration).Unix(),
        },
    }
    token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString(jwtKey)
    return token, err
}