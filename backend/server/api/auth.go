package api

import (
	"encoding/json"
	"go-server-test/server/db/models"
	"log"
	"net/http"
)

func LoginStart(w http.ResponseWriter, r *http.Request) {
	var user models.User
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&user); err != nil {
		log.Println("Could not decode:", err)
		w.WriteHeader(400)
		message := "Invalid message body."
		w.Write([]byte(message))
		return
	}

	user.MakeLoginToken()
	user.Save()

	encoder := json.NewEncoder(w)
	encoder.Encode(user)
}

type LoginVerifyStruct struct {
	User   models.User `json:"user"`
	SigHex string      `json:"sigHex"`
}

func LoginVerify(w http.ResponseWriter, r *http.Request) {
	var body LoginVerifyStruct
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&body); err != nil {
		log.Println("Could not decode:", err)
		w.WriteHeader(400)
		w.Write([]byte("Invalid message body."))
		return
	}

	result := body.User.Verify(body.SigHex)

	if result {
		w.Write([]byte("success"))
	} else {
		w.WriteHeader(401)
		w.Write([]byte("fail"))
	}
}
