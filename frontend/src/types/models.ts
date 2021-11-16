/* Do not change, this code is generated from Golang structs */


export interface TokenChain {
    name: string;
    website: string;
    baseCurrency: string;
    provider: Provider;
    address: string;
}
export interface AccountToken {
    name: string;
    symbol: string;
    decimals: number;
    chains: TokenChain[];
    balance: number;
}
export interface Chain {
    name: string;
    website: string;
    baseCurrency: string;
    provider: Provider;
}
export interface Transaction {
    timestamp: string;
    hash: string;
    chain: Chain;
    from: string;
    to: string;
    type: string;
    value: number;
    gasPrice: string;
    gasUsed: string;
    gasLimit: string;
}
export interface Provider {
    url: string;
    user: string;
    pass: string;
}
export interface AccountChain {
    name: string;
    website: string;
    baseCurrency: string;
    provider: Provider;
    txs: Transaction[];
    balance: number;
}
export interface Account {
    address: string;
    label: string;
    type: string;
    chains: AccountChain[];
    tokens: AccountToken[];
}




export interface User {
    id: string;
    address: string;
    watchedAccounts: Account[];
    loginToken: string;
}
export interface Token {
    name: string;
    symbol: string;
    decimals: number;
    chains: TokenChain[];
}

