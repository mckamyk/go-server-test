package models

import (
	"log"

	"github.com/tkrajina/typescriptify-golang-structs/typescriptify"
)

func BuildTypes() {
	converter := typescriptify.New()
	converter.Add(Account{}).Add(AccountChain{}).Add(AccountToken{})
	converter.Add(Chain{}).Add(Provider{})
	converter.Add(User{})
	converter.Add(Token{}).Add(TokenChain{})
	converter.Add(Transaction{})

	log.Println("Writing Types...")
	converter.CreateInterface = true
	converter.BackupDir = "/dev/zero"
	err := converter.ConvertToFile("../frontend/src/types/models.ts")
	if err != nil {
		log.Println("Error writing types...")
		log.Println(err)
	}
}
