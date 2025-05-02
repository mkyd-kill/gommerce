package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	UserEmail string       `json:"user_email"`
	FullName  string       `json:"full_name"`
	Address   string       `json:"address"`
	Phone     string       `json:"phone"`
	Items     []OrderItem  `json:"items" gorm:"foreignKey:OrderID"`
	Total     float64      `json:"total"`
}

type OrderItem struct {
	gorm.Model
	OrderID       uint    `json:"order_id"`
	ProductID     uint    `json:"product_id"`
	ProductName   string  `json:"product_name"`
	Quantity      int     `json:"quantity"`
	Price         float64 `json:"price"`
}