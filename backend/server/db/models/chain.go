package models

type Provider struct {
	Url  string `json:"url"`
	User string `json:"user"`
	Pass string `json:"pass"`
}

type Chain struct {
	Name         string   `json:"name"`
	Website      string   `json:"website"`
	BaseCurrency string   `json:"baseCurrency"`
	Provider     Provider `json:"provider"`
}
