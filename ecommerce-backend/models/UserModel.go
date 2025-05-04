package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Firstname string	`json:"first_name"`
	Lastname string		`json:"last_name"`
	Username string		`json:"username" gorm:"uniqueIndex"`
	Email string		`json:"email" gorm:"uniqueIndex"`
	Password string		`json:"-"`
}