import {ethers} from 'ethers';

declare const window: Window & typeof globalThis & {
  ethereum: any;
};

export let provider: ethers.providers.Web3Provider;
export let signer: ethers.providers.JsonRpcSigner;

export const isConnected = async ():Promise<boolean> => {
	const accounts = await window.ethereum.request({method: 'eth_accounts'}) as string[];
	return accounts.length > 0;
};

export const connect = async () => {
	if (!await isConnected()) {
		await window.ethereum.request({method: 'eth_requestAccounts'});
	}
};

const setupAccounts = (accounts: string[]) => {
	if (accounts.length) {
		provider = provider || new ethers.providers.Web3Provider(window.ethereum);
		signer = signer || provider.getSigner();
	}
};

export const tryConnect = async () => {
	try {
		const accounts = await window.ethereum.request({method: 'eth_accounts'}) as string[];
		if (accounts.length) {
			setupAccounts(accounts);
		}
	} catch {
		console.log('Ethereum not connected.');
	}
};

export const login = async () => {
	fetch('/api/login').then(r => r.text());
};

tryConnect();
