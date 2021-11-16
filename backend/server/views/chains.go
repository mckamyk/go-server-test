package views

import (
	"encoding/json"
	"go-server-test/server/controllers"
	"net/http"

	"github.com/gorilla/mux"
)

func SetupChainsRoutes(r *mux.Router) {
	r.HandleFunc("/", GetAllChains).Methods("GET")
}

func GetAllChains(w http.ResponseWriter, r *http.Request) {
	chains, err := controllers.GetAllChains()
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
	}

	resp, err := json.Marshal(*chains)
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
	}

	w.Write(resp)
}
