package models

type Transaction struct {
	Timestamp string `json:"timestamp"`
	Hash      string `json:"hash"`
	Chain     Chain  `json:"chain"`
	From      string `json:"from"`
	To        string `json:"to"`
	Type      string `json:"type"`
	Value     uint64 `json:"value"`
	GasPrice  string `json:"gasPrice"`
	GasUsed   string `json:"gasUsed"`
	GasLimit  string `json:"gasLimit"`
}
