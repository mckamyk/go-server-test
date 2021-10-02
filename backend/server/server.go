package server

import (
	"go-server-test/server/api"
	"go-server-test/server/eth"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func Start() {
	r := mux.NewRouter()
	r.Host(":8080")

	authCheck := r.PathPrefix("/api/check").Subrouter()
	authCheck.Use(api.Protected)
	authCheck.HandleFunc("", emptyHandler)

	protected := r.PathPrefix("/api").Subrouter()
	protected.HandleFunc("", api.HandleRoot)
	protected.Use(api.Protected)

	ethRouter := r.PathPrefix("/api/eth").Subrouter()
	ethRouter.Use(api.Protected)
	eth.SetupRoutes(ethRouter)

	loginRouter := r.PathPrefix("/api/login").Subrouter()
	loginRouter.HandleFunc("/start", api.LoginStart)
	loginRouter.HandleFunc("/verify", api.LoginVerify)

	log.Fatal(http.ListenAndServe(":8080", handlers.CompressHandler(handlers.LoggingHandler(os.Stdout, r))))
}

func emptyHandler(w http.ResponseWriter, r *http.Request) {
}
