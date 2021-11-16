package eth

import (
	"encoding/json"
	"go-server-test/server/services/db"
	"log"
	"net/http"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/gorilla/mux"
)

var Client *ethclient.Client

func Connect() {
	ctx, cancel := db.Timeout()
	defer cancel()
	clt, err := ethclient.DialContext(ctx, "wss://mainnet.infura.io/ws/v3/7771eec4d31147a78b9c67a3ae6e32c8")
	if err != nil {
		log.Println(err)
		return
	}

	log.Println("Eth Node Connected")

	Client = clt
}

type BalancesRequest struct {
	Address common.Address `json:"address"`
}

func GetBalanceRoute(w http.ResponseWriter, r *http.Request) {
	var balReq BalancesRequest
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&balReq); err != nil {
		log.Println(err)
		w.WriteHeader(400)
		return
	}
	bal := GetBalance(balReq.Address)
	encoder := json.NewEncoder(w)
	encoder.Encode(bal)
}

func GetAllTokenBalancesRoute(w http.ResponseWriter, r *http.Request) {
	var balReq BalancesRequest
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&balReq); err != nil {
		log.Println(err)
		w.WriteHeader(400)
		return
	}
	bals := GetAllTokenBalances(balReq.Address)
	encoder := json.NewEncoder(w)
	encoder.Encode(bals)
}

func SetupRoutes(r *mux.Router) {
	GetTokenList()
	r.HandleFunc("/balances", GetBalanceRoute).Methods("POST")
	r.HandleFunc("/balances/tokens", GetAllTokenBalancesRoute).Methods("POST")
}
