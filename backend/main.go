package main

import (
	"go-server-test/server"
	"go-server-test/server/models"
	"go-server-test/server/services/db"
	"go-server-test/server/services/eth"
)

func main() {
	models.BuildTypes()

	db.Connect()
	eth.Connect()
	server.Start() //blocks
}
