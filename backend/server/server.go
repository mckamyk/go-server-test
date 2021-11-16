package server

import (
	"go-server-test/server/services/eth"
	"go-server-test/server/views"
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
	protected.Use(views.Protected)

	ethRouter := r.PathPrefix("/api/eth").Subrouter()
	ethRouter.Use(views.Protected)
	eth.SetupRoutes(ethRouter)

	chainsRouter := r.PathPrefix("/api/chains").Subrouter()
	chainsRouter.Use(views.Protected)
	views.SetupChainsRoutes(chainsRouter)

	loginRouter := r.PathPrefix("/api/login").Subrouter()
	views.SetupLoginRoutes(loginRouter)

	log.Fatal(http.ListenAndServe(":8080", handlers.CompressHandler(handlers.LoggingHandler(os.Stdout, r))))
}
