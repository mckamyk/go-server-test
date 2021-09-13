import {signer} from './ethHandler';

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

	const success = await fetch('/api/login/verify', {
		method: 'post',
		body: JSON.stringify({
			user: {address},
			sigHex: signature,
		}),
	}).then(r => r.text());

	console.log(success);
};
