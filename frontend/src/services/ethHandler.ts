import {ethers} from 'ethers';
import {checkAuth} from './auth';
import {dispatch, setAccount} from './redux/accountSlice';

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
		dispatch(setAccount(accounts[0]));
	} else {
		dispatch(setAccount(undefined));
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

window.ethereum.on('accountsChanged', (accounts: string[]) => {
	setupAccounts(accounts);
	checkAuth();
});

export const login = async () => {
	fetch('/api/login').then(r => r.text());
};

tryConnect();
