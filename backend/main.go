package main

import (
	"go-server-test/server"
	"go-server-test/server/db"
	"log"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		server.Start()
		wg.Done()
	}()
	go func() {
		db.Connect()
		wg.Done()
	}()

	defer func() {
		ctx, cancel := db.Timeout()
		defer cancel()
		db.Client.Disconnect(ctx)
	}()

	wg.Wait()
	log.Println("Shutting down...")
}
