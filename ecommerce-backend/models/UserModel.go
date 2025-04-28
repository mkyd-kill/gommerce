package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string		`json:"username" gorm:"uniqueIndex"`
	Email string		`json:"email" gorm:"uniqueIndex"`
	Password string		`json:"-"`
}