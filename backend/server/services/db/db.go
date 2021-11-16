package db

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

func Timeout() (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.Background(), 10*time.Second)
}

func Connect() {
	ctx, cancel := Timeout()
	defer cancel()
	clt, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://root:example@127.0.0.1:27017"))
	if err != nil {
		log.Panicln(err)
	} else {
		log.Println("DB Connected")
	}
	Client = clt
}

func CheckConnection() {
	ctx, cancel := Timeout()
	defer cancel()
	Client.Ping(ctx, nil)
}

func DatabaseNames() {
	ctx, cancel := Timeout()
	defer cancel()
	names, err := Client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		log.Panicln(err)
	}
	fmt.Println(names)
}
