package models

import (
	"context"
	"encoding/json"
	"go-server-test/server/db"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TestStruct struct {
	Test string `json:"test"`
}

func (ts TestStruct) insert() string {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	collection := db.Client.Database("test").Collection("TestStruct")
	res, err := collection.InsertOne(ctx, ts)
	if err != nil {
		log.Panicln(err)
	}
	return res.InsertedID.(primitive.ObjectID).Hex()
}

func ParseTest(r *http.Request) string {
	decoder := json.NewDecoder(r.Body)

	var t TestStruct
	err := decoder.Decode(&t)
	if err != nil {
		log.Panicln(err)
	}

	return t.insert()
}
