package models

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"go-server-test/server/services/db"
	"log"
	"time"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
	Id              string    `json:"id"`
	Address         string    `json:"address"`
	WatchedAccounts []Account `json:"watchedAccounts"`

	LoginToken        string `json:"loginToken"`
	LoginTokenExpires string
}

func (u *User) Save() {
	users := db.Client.Database("sys").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	opts := options.Update().SetUpsert(true)
	filter := bson.M{"address": u.Address}
	update := bson.M{"$set": u}
	_, err := users.UpdateOne(ctx, filter, update, opts)
	if err != nil {
		log.Println(err)
		return
	}
}

func (u *User) Verify(sigHex string) (bool, *User) {
	users := db.Client.Database("sys").Collection("users")
	ctx, cancel := db.Timeout()
	defer cancel()
	filter := bson.M{"address": u.Address}
	var user User
	err := users.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		log.Println("Failed authentication: No User", u.Address)
		return false, nil
	}

	expires, err := time.Parse(time.RFC3339, user.LoginTokenExpires)
	if err != nil {
		return false, nil
	}
	if time.Now().After(expires) {
		return false, nil
	}

	valid := u.VerifySig(sigHex, []byte(user.LoginToken))

	if valid {
		user.LoginToken = ""
		user.Save()
	}

	return valid, &user
}

func (u *User) MakeLoginToken() {
	token := make([]byte, 12)
	rand.Read(token)
	u.LoginToken = base64.StdEncoding.EncodeToString(token)
	expires := time.Now().Add(time.Minute * 10)
	expiresText, err := expires.MarshalText()
	if err != nil {
		log.Panicln("Cannot Marshal time!", expires, err)
	}

	u.LoginTokenExpires = string(expiresText)

}

func makeSig(data []byte) []byte {
	msg := fmt.Sprintf("\x19Ethereum Signed Message:\n%d%s", len(data), data)
	return crypto.Keccak256([]byte(msg))
}

func (u *User) VerifySig(sigHex string, msg []byte) bool {
	fromAddr := common.HexToAddress(u.Address)

	sig := hexutil.MustDecode(sigHex)
	if sig[64] != 27 && sig[64] != 28 {
		log.Println("Failed authentication: Bad Format")
		return false
	}
	sig[64] -= 27

	pubKey, err := crypto.SigToPub(makeSig(msg), sig)
	if err != nil {
		log.Println("Failed authentication: Cannot get PubKey from Sig")
		return false
	}

	recoveredAddress := crypto.PubkeyToAddress(*pubKey)

	return fromAddr == recoveredAddress
}

func (u *User) WatchAccount(address string, label string) interface{} {
	account := Account{
		Address: address,
		Label:   label,
	}

	accounts := db.Client.Database("sys").Collection("accounts")
	ctx, cancel := db.Timeout()
	defer cancel()

	insertResult, err := accounts.InsertOne(ctx, account)
	if err != nil {
		log.Println(err)
		return nil
	}

	return insertResult.InsertedID
}
