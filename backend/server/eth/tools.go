package eth

import (
	"go-server-test/server/db"
	"log"
)

func DeltaToBlock(delta int) uint64 {
	ctx, cancel := db.Timeout()
	defer cancel()
	currentBlock, err := Client.BlockNumber(ctx)
	if err != nil {
		log.Panicln(err)
	}

	return currentBlock - uint64(delta*13)
}
