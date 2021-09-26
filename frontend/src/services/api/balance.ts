import {signer} from '../ethHandler';

interface BalancesRequest {
  address: string;
  delta: number;
}

export const getBalances = async (delta: number): Promise<string> => {
	const resp = await fetch('/api/eth/balances', {
		method: 'post',
		body: JSON.stringify({
			address: await signer.getAddress(),
			delta,
		} as BalancesRequest),
	}).then(r => r.json()).then(data => JSON.stringify(data, undefined, 2));

	return resp;
};
