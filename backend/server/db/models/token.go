package models

type TokenChain struct {
	Chain
	Address string `json:"address"`
}

type Token struct {
	Name     string       `json:"name"`
	Symbol   string       `json:"symbol"`
	Decimals int          `json:"decimals"`
	Chains   []TokenChain `json:"chains"`
}
