import {dispatch, setAccount, setAuthenticated} from '../redux/accountSlice';

// eslint-disable-next-line no-undef
export const safeFetch = async (url: string, method?: RequestInit['method'], data?: any): Promise<Response> => {
	const resp = await fetch(url, {
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	});

	if (resp.ok) {
		return resp;
	}

	switch (resp.status) {
		case 401:
			dispatch(setAccount(undefined));
			dispatch(setAuthenticated(false));
			break;
		default:
	}

	return resp;
};
