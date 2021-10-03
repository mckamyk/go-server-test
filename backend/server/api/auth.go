package api

import (
	"context"
	"encoding/json"
	"errors"
	"go-server-test/server/db/models"
	"log"
	"net/http"

	"github.com/golang-jwt/jwt"
	"github.com/gorilla/mux"
)

func SetupLoginRoutes(r *mux.Router) {
	r.HandleFunc("/start", LoginStart).Methods("POST")
	r.HandleFunc("/verfiy", LoginVerify).Methods("POST")
	r.HandleFunc("/check", LoginCheck).Methods("POST")
}

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

type UserClaims struct {
	Id      string
	Address string
}

func (c UserClaims) Valid() error {
	return nil
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

	success, user := body.User.Verify(body.SigHex)

	if success {
		claims := UserClaims{Id: user.Id, Address: user.Address}

		token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString(JwtSigner)
		if err != nil {
			log.Panicln("Error creating/signing JWT:", err)
		}
		cookie := http.Cookie{Name: "auth", Value: token, Path: "/"}
		http.SetCookie(w, &cookie)
	} else {
		w.WriteHeader(401)
	}
}

type LoginCheckBody struct {
	Address string `json:"address"`
}

func LoginCheck(w http.ResponseWriter, r *http.Request) {
	var body LoginCheckBody
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		log.Println("Error decoding Login Check Body", err)
		reject(w)
		return
	}

	jwtString, err := getAuthCookie(r.Cookies())
	if err != nil {
		reject(w)
	}

	token, claims, err := parseJwt(jwtString)

	if err != nil {
		reject(w)
		return
	}

	if !token.Valid || claims.Address != body.Address {
		reject(w)
		return
	}
}

func getAuthCookie(cookies []*http.Cookie) (string, error) {
	for _, cookie := range cookies {
		if cookie.Name == "auth" {
			return cookie.Value, nil
		}
	}
	return "", errors.New("no auth cookie found")
}

func reject(w http.ResponseWriter) {
	w.WriteHeader(http.StatusUnauthorized)
}

type UserContextKey string

func (c UserContextKey) String() string {
	return string(c)
}

func parseJwt(jwtString string) (*jwt.Token, *UserClaims, error) {
	var claims UserClaims
	token, err := jwt.ParseWithClaims(jwtString, claims, func(token *jwt.Token) (interface{}, error) {
		return JwtSigner, nil
	})

	if err != nil {
		return nil, nil, err
	}

	return token, &claims, nil
}

func Protected(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookies := r.Cookies()

		jwtString, err := getAuthCookie(cookies)
		if err != nil {
			log.Println(err)
			reject(w)
		}

		token, claims, err := parseJwt(jwtString)

		if err != nil {
			reject(w)
			log.Println("Failed Auth: Error parsing/validating token")
			log.Println(err)
			return
		}

		if token.Valid {
			ctx := context.WithValue(r.Context(), UserContextKey("user"), claims)
			r = r.Clone(ctx)
			next.ServeHTTP(w, r)
		} else {
			w.WriteHeader(http.StatusUnauthorized)
			log.Println("Failed Auth: Token not valid.")
		}
	})
}
