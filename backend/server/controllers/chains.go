package controllers

import (
	"go-server-test/server/models"
	"go-server-test/server/services/db"

	"go.mongodb.org/mongo-driver/bson"
)

func GetAllChains() (*[]models.Chain, error) {
	coll := db.Client.Database("sys").Collection("chains")
	ctx, cancel := db.Timeout()
	defer cancel()

	chainCursor, err := coll.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}

	chains := make([]models.Chain, 0)
	chainCursor.All(ctx, chains)

	return &chains, nil
}
