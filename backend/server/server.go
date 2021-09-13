package server

import (
	"go-server-test/server/api"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func Start() {
	r := mux.NewRouter()
	r.Host(":8080")
	loginRouter := r.PathPrefix("/api/login").Subrouter()
	loginRouter.HandleFunc("/start", api.LoginStart)
	loginRouter.HandleFunc("/verify", api.LoginVerify)

	r.HandleFunc("/api", api.HandleRoot)
	log.Fatal(http.ListenAndServe(":8080", handlers.CompressHandler(handlers.LoggingHandler(os.Stdout, r))))
}
