import {signer} from '../ethHandler';
import {BigNumber} from 'ethers';

interface BalancesRequest {
  address: string;
  delta: number;
}

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
	const balAsString = await fetch('/api/eth/balances', {
		method: 'post',
		body: JSON.stringify({
			address: await signer.getAddress(),
		} as BalancesRequest),
	}).then(r => r.text());

	return BigNumber.from(balAsString.trim());
};

export const getTokenBalances = async (): Promise<TokenBalance[]> => {
	const tokenBalances = await fetch('/api/eth/balances/tokens', {
		method: 'post',
		body: JSON.stringify({
			address: await signer.getAddress(),
		} as BalancesRequest),
	}).then(r => r.json()) as TokenBalanceDirty[];

	return tokenBalances.map(tokenBal => {
		const balance = BigNumber.from(tokenBal.balance);
		return {
			...tokenBal,
			balance,
		};
	});
};
