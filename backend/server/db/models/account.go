package models

type AccountChain struct {
	Chain
	Txs     []Transaction `json:"txs"`
	Balance uint64        `json:"balance"`
}

type AccountToken struct {
	Token
	Balance uint64 `json:"balance"`
}

type Account struct {
	Address string         `json:"address"`
	Label   string         `json:"label"`
	Type    string         `json:"type"`
	Chains  []AccountChain `json:"chains"`
	Tokens  []AccountToken `json:"tokens"`
}
