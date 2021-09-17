package eth

import (
	"go-server-test/server/db"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
)

type BalanceAtBlock struct {
	Block   *big.Int `json:"block"`
	Balance *big.Int `json:"balance"`
}

func DeltaToBlock(delta uint64) (*big.Int, *big.Int) {
	ctx, cancel := db.Timeout()
	defer cancel()
	currentBlock, err := Client.BlockNumber(ctx)
	if err != nil {
		log.Panicln(err)
	}

	return new(big.Int).SetUint64(currentBlock - delta*13), new(big.Int).SetUint64(currentBlock)
}

func Balances(address common.Address, delta uint64, resolution uint64) []BalanceAtBlock {
	startBlock, endBlock := DeltaToBlock(delta)
	blockSet := blockSet(startBlock, endBlock, resolution)
	bals := BalanceHistory(address, blockSet, resolution)
	return bals
}

func BalanceHistory(address common.Address, blockSet []*big.Int, resolution uint64) []BalanceAtBlock {
	CONCURRENT := 10
	jobs := make(chan *big.Int, CONCURRENT)
	resps := make(chan BalanceAtBlock, CONCURRENT)

	getBalance := func(in <-chan *big.Int, out chan<- BalanceAtBlock) {
		ctx, cancel := db.Timeout()
		defer cancel()
		block := <-in
		bal, err := Client.BalanceAt(ctx, address, block)
		if err != nil {
			log.Printf("Error getting balance at %s\n", err)
			log.Panicln(err)
		}
		out <- BalanceAtBlock{block, bal}
	}

	for x := 0; x < CONCURRENT; x++ {
		go getBalance(jobs, resps)
	}

	for _, x := range blockSet {
		jobs <- x
	}

	bals := make([]BalanceAtBlock, 100)

	for x := range resps {
		bals = append(bals, x)
	}

	return bals
}

func blockSet(startBlock *big.Int, endBlock *big.Int, resolution uint64) []*big.Int {
	blocks := make([]*big.Int, resolution)
	res := new(big.Int).SetUint64(resolution)
	one := new(big.Int).SetInt64(1)

	if new(big.Int).Sub(endBlock, startBlock).Cmp(res) < 0 {
		for x := *startBlock; x.Cmp(endBlock) >= 0; x.Add(&x, one) {
			blocks = append(blocks, &x)
		}
		return blocks
	}

	for x := *startBlock; x.Cmp(endBlock) >= 0; x.Add(&x, res) {
		blocks = append(blocks, &x)
	}
	return blocks
}
