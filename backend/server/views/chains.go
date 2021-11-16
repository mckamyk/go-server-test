package views

import (
	"encoding/json"
	"go-server-test/server/controllers"
	"go-server-test/server/models"
	"net/http"

	"github.com/gorilla/mux"
)

func SetupChainsRoutes(r *mux.Router) {
	r.HandleFunc("/", GetAllChains).Methods("GET")
	r.HandleFunc("/new", AddChain).Methods("POST")
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

func AddChain(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var chain models.Chain
	decoder.Decode(&chain)

	err := controllers.AddChain(&chain)
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
	}
	w.Write([]byte{})
}
