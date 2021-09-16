package main

import (
	"go-server-test/server"
	"go-server-test/server/db"
	"go-server-test/server/eth"
)

func main() {
	db.Connect()
	eth.Connect()
	server.Start() //blocks
}
