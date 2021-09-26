package eth

import (
	"context"
	"go-server-test/server/db"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
)

type BalanceAtBlock struct {
	Block   *big.Int `json:"block"`
	Balance *big.Int `json:"balance"`
}

func DeltaToBlock(delta uint64) (*big.Int, *big.Int, error) {
	ctx, cancel := db.Timeout()
	defer cancel()
	currentBlock, err := Client.BlockNumber(ctx)
	log.Println(currentBlock)
	if err != nil {
		log.Println(err)
		return nil, nil, err
	}

	return new(big.Int).SetUint64(currentBlock - delta*13), new(big.Int).SetUint64(currentBlock), nil
}

func Balances(address common.Address, delta uint64, resolution uint64) ([]*BalanceAtBlock, error) {
	startBlock, endBlock, err := DeltaToBlock(delta)
	if err != nil {
		log.Println("Error getting starting and ending block: ", err)
		return nil, err
	}
	blockSet := blockSet(startBlock, endBlock, resolution)
	bals, err := BalanceHistory(address, blockSet)
	if err != nil {
		log.Println("Error getting balance history", err)
		return nil, err
	}
	return bals, nil
}

func BalanceHistory(address common.Address, blockSet []*big.Int) ([]*BalanceAtBlock, error) {
	bals := make([]*BalanceAtBlock, 0, len(blockSet))

	for _, block := range blockSet {
		ctx := context.Background()
		bal, err := Client.BalanceAt(ctx, address, block)
		if err != nil {
			log.Println(err)
		} else {
			blockBal := BalanceAtBlock{block, bal}
			bals = append(bals, &blockBal)
		}
	}
	return bals, nil
}

func blockSet(startBlock *big.Int, endBlock *big.Int, resolution uint64) []*big.Int {
	blocks := make([]*big.Int, 0, resolution)
	res := new(big.Int).SetUint64(resolution)
	one := new(big.Int).SetInt64(1)

	if new(big.Int).Sub(endBlock, startBlock).Cmp(res) < 0 {
		for x := *startBlock; x.Cmp(endBlock) >= 0; x.Add(&x, one) {
			blocks = append(blocks, &x)
		}
		return blocks
	}

	difference := new(big.Int).Sub(endBlock, startBlock)
	step := new(big.Int).Div(difference, res)

	for i := new(big.Int); i.Cmp(res) < 0; i.Add(i, one) {
		delta := new(big.Int).Mul(i, step)
		block := new(big.Int).Add(startBlock, delta)
		blocks = append(blocks, block)
	}
	return blocks
}
