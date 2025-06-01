package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Firstname   string    `json:"firstname" validate:"min=2,max=30"`
	Lastname    string    `json:"lastname" validate:"min=2,max=30"`
	Username    string    `json:"username" gorm:"uniqueIndex" validate:"required"`
	Email       string    `json:"email" gorm:"uniqueIndex" validate:"email"`
	Password    string    `json:"-" validate:"min=6"`
	PhoneNumber string    `json:"phone_number"`
	UserRole    string    `json:"user_role" validate:"oneof=ADMIN USER"`
	Addresses   []Address `json:"addresses" gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
	Orders      []Order   `json:"orders" gorm:"foreignKey:UserID;constraint:OnDelete:SET NULL"`
	Cards       []CreditCard `json:"cards" gorm:"foreignKey:UserID"`
}

type CreditCard struct {
	gorm.Model
	Number string `json:"card_number" validate:"len=16"` // simplified
	UserID uint   `json:"user_id"`
}

type Product struct {
	gorm.Model
	Name        string  `json:"name" validate:"required"`
	Description string  `json:"description"`
	Price       float64 `json:"price" validate:"gte=0"`
	Category    string  `json:"category"`
	Image       string  `json:"image"`
	Featured    bool    `json:"featured"`
	Stock       int     `json:"stock" validate:"gte=0"`
	Rating      int     `json:"rating" validate:"min=0,max=5"`
}

type Address struct {
	gorm.Model
	UserID  uint   `json:"user_id"`
	Street  string `json:"street"`
	City    string `json:"city"`
	Pincode string `json:"pincode"`
}

type Order struct {
	gorm.Model
	UserID        uint            `json:"user_id"`
	User          *User           `json:"-"`
	Items         []OrderItem     `json:"items" gorm:"foreignKey:OrderID;constraint:OnDelete:CASCADE"`
	Total         float64         `json:"total"`
	Status        string          `json:"status"` // e.g. PENDING, SHIPPED
	PaymentMethod string          `json:"payment_method"` // e.g. CARD, COD
	ShippingAddr  Address         `json:"shipping_address" gorm:"embedded"`
}

type OrderItem struct {
	gorm.Model
	OrderID   uint    `json:"order_id"`
	ProductID uint    `json:"product_id"`
	Product   Product `json:"product"`
	Quantity  int     `json:"quantity" validate:"gt=0"`
	Price     float64 `json:"price"`
}

type Payment struct {
	gorm.Model
	OrderID uint `json:"order_id"`
	Method  string `json:"method"` // COD, CARD, etc.
	Status  string `json:"status"` // PAID, UNPAID
}