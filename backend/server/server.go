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

	protected := r.PathPrefix("/api").Subrouter()
	protected.Use(api.Protected)

	ethRouter := r.PathPrefix("/api/eth").Subrouter()
	ethRouter.Use(api.Protected)
	eth.SetupRoutes(ethRouter)

	loginRouter := r.PathPrefix("/api/login").Subrouter()
	api.SetupLoginRoutes(loginRouter)

	log.Fatal(http.ListenAndServe(":8080", handlers.CompressHandler(handlers.LoggingHandler(os.Stdout, r))))
}
