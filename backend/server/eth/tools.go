package eth

import (
	"context"
	"errors"
	"log"
	"math/big"
	"time"

	"github.com/ethereum/go-ethereum/common"

	erc20 "go-server-test/contracts/structs"
)

func GetBalance(address common.Address) *big.Int {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()
	balace, err := Client.BalanceAt(ctx, address, nil)
	if err != nil {
		log.Println("Error getting balance:", err)
	}
	return balace
}

func GetTokenBalance(address common.Address, token *Token) (*TokenBalance, error) {
	if token.ChainId != 1 {
		log.Printf("Unsupported Chain ID %d for %s at %s\n", token.ChainId, token.Name, token.Address)
		return nil, errors.New("unsupported chain id")
	}

	ctr, err := erc20.NewERC20(token.Address, Client)
	if err != nil {
		log.Println("Error loading ERC20:", err)
		return nil, err
	}

	bal, err := ctr.BalanceOf(nil, address)
	if err != nil {
		log.Printf("Error getting ERC20 balance of %s at %s: %s", token.Name, token.Address, err)
		return nil, err
	}

	tokenBalance := TokenBalance{*token, bal}

	return &tokenBalance, nil
}

func GetAllTokenBalances(address common.Address) []*TokenBalance {
	var bals []*TokenBalance
	for _, e := range *Tokens {
		bal, err := GetTokenBalance(address, &e)
		if err != nil {
			continue
		}
		bals = append(bals, bal)
	}

	return bals
}
