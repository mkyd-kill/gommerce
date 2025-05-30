package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Firstname 		string		`json:"first_name" validate:"min=2,max=30"`
	Lastname 		string		`json:"last_name" validate:"min=2,max=30"`
	Username 		string		`json:"username" gorm:"uniqueIndex"`
	Email 			string		`json:"email" gorm:"uniqueIndex"`
	Password 		string		`json:"-" validate:"min=6"`
	PhoneNumber 	string		`json:"phone_number"`
	UserType 		string		`json:"user_type" validate:"eq=ADMIN|eq=USER"`
	ShipAddress 	[]Address	`json:"address"`
	Order_Status 	[]Order		`json:"orders"`
}

type Product struct {
	gorm.Model
	Name 			string 		`json:"name"`
	Description 	string 		`json:"description"`
	Price 			float64 	`json:"price"`
	Category 		string 		`json:"category"`
	Image 			string 		`json:"image"`
	Featured		bool		`json:"featured"`
	Stock 			int 		`json:"stock"`
	Rating 			int			`json:"rating"`
}

type Address struct {
	gorm.Model
	Street			string		`json:"street"`
	City			string		`json:"city"`
	Pincode			string		`json:"pincode"`
}

type Order struct {
	gorm.Model
	Price			float64		`json:"price"`
	Discount		float64		`json:"discount"`
	Payment_Method	Payment		`json:"paymethod"`
}

type Payment struct {
	gorm.Model
	Digit 			bool		`json:"digit"`
	COD 			bool		`json:"cod"`	// cash on delivery
}