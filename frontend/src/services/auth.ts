import Cookies from 'js-cookie';
import {safeFetch} from './api/safeFetch';
import {signer} from './ethHandler';
import {dispatch, setAuthenticated} from './redux/accountSlice';
import {store} from './redux/store';

interface LoginStartResponse {
  address: string;
  loginToken: string;
}

export const loginStart = async () => {
	const address = await signer.getAddress();

	const {loginToken} = await fetch('/api/login/start', {
		method: 'post',
		body: JSON.stringify({address}),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(r => r.json()) as LoginStartResponse;

	const signature = await signer.signMessage(loginToken);

	try {
		await fetch('/api/login/verify', {
			method: 'post',
			body: JSON.stringify({
				user: {address},
				sigHex: signature,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(r => r.text());

		checkAuth();
	} catch {
		dispatch(setAuthenticated(false));
	}
};

export const checkAuth = async () => {
	safeFetch('/api/login/check', 'post', {address: store.getState().accountReducer.address});
};

export const logOut = () => {
	Cookies.remove('auth');
};

checkAuth();
