package eth

import (
	"encoding/json"
	"go-server-test/server/db"
	"log"
	"math/big"
	"net/http"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

var Client *ethclient.Client

func Connect() {
	ctx, cancel := db.Timeout()
	defer cancel()
	clt, err := ethclient.DialContext(ctx, "http://127.0.0.1:8545")
	if err != nil {
		log.Panicln(err)
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
		log.Panicln(err)
	}

}
