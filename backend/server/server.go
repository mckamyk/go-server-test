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
	r.HandleFunc("/api", api.HandleRoot)
	r.HandleFunc("/api/foo", api.HandleFoo)
	log.Fatal(http.ListenAndServe(":8080", handlers.CompressHandler(handlers.LoggingHandler(os.Stdout, r))))
}
