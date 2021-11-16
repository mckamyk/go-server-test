package main

import (
	"go-server-test/server"
	"go-server-test/server/services/db"
	"go-server-test/server/services/eth"
)

func main() {
	db.Connect()
	eth.Connect()
	server.Start() //blocks
}
