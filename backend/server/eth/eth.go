package eth

import (
	"encoding/json"
	"go-server-test/server/db"
	"log"
	"math/big"
	"net/http"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/gorilla/mux"
)

var Client *ethclient.Client

func Connect() {
	ctx, cancel := db.Timeout()
	defer cancel()
	clt, err := ethclient.DialContext(ctx, "/home/mac/.ethereum/geth.ipc")
	if err != nil {
		log.Println(err)
		return
	}

	log.Println("Eth Node Connected")

	Client = clt
}

type BalancesRequest struct {
	Address common.Address `json:"address"`
	Delta   uint           `json:"delta"`
}

type BlockBalance struct {
	Address common.Address `json:"address"`
	Block   *big.Int       `json:"block"`
	Balance *big.Int       `json:"balance"`
}

func GetBalances(w http.ResponseWriter, r *http.Request) {
	var balReq BalancesRequest
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&balReq); err != nil {
		log.Println(err)
		w.WriteHeader(400)
		return
	}
	bals, err := Balances(balReq.Address, uint64(balReq.Delta), 100)
	if err != nil {
		w.WriteHeader(500)
		return
	}
	encoder := json.NewEncoder(w)
	encoder.Encode(bals)
}

func SetupRoutes(r *mux.Router) {
	r.HandleFunc("/balances", GetBalances).Methods("POST")
}
