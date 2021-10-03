import {BigNumber} from 'ethers';
import {store} from '../redux/store';
import {safeFetch} from './safeFetch';

export interface Token {
	chainId: number;
	address: string;
	name: string;
	symbol: string;
	decimals: string;
	logoURI: string;
}

export interface TokenBalanceDirty extends Token {
	balance: string;
}

export interface TokenBalance extends Token {
	balance: BigNumber;
}

export const getBalance = async (): Promise<BigNumber> => {
	const balAsString = await safeFetch('/api/eth/balances', 'post', {address: store.getState().accountReducer.address})
		.then(r => r.text());

	return BigNumber.from(balAsString.trim());
};

export const getTokenBalances = async (): Promise<TokenBalance[]> => {
	const tokenBalances = await safeFetch('/api/eth/balances/tokens', 'post', {address: store.getState().accountReducer.address})
		.then(r => r.json()) as TokenBalance[];

	return tokenBalances.map(tokenBal => {
		const balance = BigNumber.from(tokenBal.balance);
		return {
			...tokenBal,
			balance,
		};
	});
};
