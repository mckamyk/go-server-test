import Cookies from 'js-cookie';
import {signer} from './ethHandler';
import {dispatch, setAuthenticated} from './redux/accountSlice';

interface LoginStartResponse {
  address: string;
  loginToken: string;
}

export const loginStart = async () => {
	const address = await signer.getAddress();

	const {loginToken} = await fetch('/api/login/start', {
		method: 'post',
		body: JSON.stringify({address}),
	}).then(r => r.json()) as LoginStartResponse;

	const signature = await signer.signMessage(loginToken);

	try {
		await fetch('/api/login/verify', {
			method: 'post',
			body: JSON.stringify({
				user: {address},
				sigHex: signature,
			}),
		}).then(r => r.text());

		checkAuth();
	} catch {
		dispatch(setAuthenticated(false));
	}
};

export const checkAuth = async () => {
	try {
		await fetch('/api/check');
		dispatch(setAuthenticated(true));
	} catch {
		dispatch(setAuthenticated(true));
	}
};

export const logOut = () => {
	Cookies.remove('auth');
};

checkAuth();
