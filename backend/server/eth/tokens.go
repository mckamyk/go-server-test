package eth

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"math/big"
	"net/http"

	"github.com/ethereum/go-ethereum/common"
)

type Token struct {
	ChainId  uint           `json:"chainId"`
	Address  common.Address `json:"address"`
	Name     string         `json:"name"`
	Symbol   string         `json:"symbol"`
	Decimals uint           `json:"decimals"`
	LogoURI  string         `json:"logoURI"`
}

type TokenBalance struct {
	Token
	Balance *big.Int `json:"balance"`
}

type TokenList struct {
	Name      string `json:"name"`
	Timestamp string `json:"timestamp"`
	Version   struct {
		major uint
		minor uint
		patch uint
	} `json:"version"`
	Tags     interface{} `json:"tags"`
	LogoURI  string      `json:"logoURI"`
	Keywords []string    `json:"keyword"`
	Tokens   []Token     `json:"tokens"`
}

var Tokens *[]Token

func GetTokenList() *[]Token {
	tokenListUrl := "https://gateway.ipfs.io/ipns/tokens.uniswap.org"
	log.Println("Getting Token List...")
	resp, err := http.Get(tokenListUrl)
	if err != nil {
		log.Println("Error making token list request:", err)
		return nil
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Println("Error reading token list response:", err)
		return nil
	}

	var tokenList TokenList
	err = json.Unmarshal(body, &tokenList)
	if err != nil {
		log.Println("Error unmarshaling Token List", err)
	}

	var pruned []Token
	for _, token := range tokenList.Tokens {
		if token.ChainId != 1 {
			log.Printf("Pruning unsupported Chain Id %d for %s at %s", token.ChainId, token.Name, token.Address)
			continue
		}
		pruned = append(pruned, token)
	}

	Tokens = &pruned
	log.Printf("Retreived Token List: %d tokens", len(*Tokens))
	return Tokens
}
