package helpers

import (
	"github.com/gin-gonic/gin"
	"errors"
)

func CheckUserType(c *gin.Context, role string) (err error) {
	userType := c.GetString("user_type")
	if userType != role {
		err = errors.New("unathorized to access this resource")
		return err
	}
	return err
}

func MatchUserTypeToUid(c *gin.Context, user_id string) (err error) {
	userType := c.GetString("user_type")
	uid := c.GetString("uid")

	if userType == "USER" && uid != user_id {
		err := errors.New("unauthorized to access this resource")
		return err
	}
	err = CheckUserType(c, userType)
	return err
}