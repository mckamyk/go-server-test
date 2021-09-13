package api

import (
	"encoding/json"
	"go-server-test/server/db/models"
	"log"
	"net/http"

	"github.com/golang-jwt/jwt"
)

var JwtSigner []byte = []byte("This is the key, it should be replaced and set from Enviornment")

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
		token, err := jwt.New(jwt.SigningMethodHS256).SignedString(JwtSigner)
		if err != nil {
			log.Panicln("Error creating/signing JWT:", err)
		}
		cookie := http.Cookie{Name: "auth", Value: token, Path: "/"}
		http.SetCookie(w, &cookie)
	} else {
		w.WriteHeader(401)
	}
}
