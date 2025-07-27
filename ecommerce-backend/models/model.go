package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Firstname   string    `json:"firstname" validate:"min=2,max=30"`
	Lastname    string    `json:"lastname" validate:"min=2,max=30"`
	Username    string    `json:"username" gorm:"uniqueIndex" validate:"required"`
	Email       string    `json:"email" gorm:"uniqueIndex" validate:"email"`
	Password    string    `json:"-" validate:"min=8"`
	PhoneNumber string    `json:"phoneNumber"`
	UserRole    string    `json:"user_role" validate:"oneof=ADMIN USER"`
	Addresses   []Address `json:"addresses" gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
	Cards       []CreditCard `json:"cards" gorm:"foreignKey:UserID"`
}

type CreditCard struct {
	gorm.Model
	Number string `json:"card_number" validate:"len=16"` // simplified
	UserID uint   `json:"user_id"`
}

type Product struct {
	gorm.Model
	Name        string  `form:"name"`
	Description string  `form:"description"`
	Price       float64 `form:"price"`
	Image       string
	Stock       int     `form:"stock"`
	Rating      int     `form:"rating"`
}

type Address struct {
	gorm.Model
	UserID  uint   `json:"user_id"`
	Street  string `json:"street"`
	City    string `json:"city"`
	Pincode string `json:"pincode"`
}

type Payment struct {
	gorm.Model
	OrderID uint `json:"order_id"`
	Method  string `json:"method"` // COD, CARD, etc.
	Status  string `json:"status"` // PAID, UNPAID
}