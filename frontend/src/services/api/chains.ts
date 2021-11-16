import {safeFetch} from './safeFetch';

export const getAllChains = async () => {
	const resp = await safeFetch('/api/chains/').then(r => r.json());
	return resp;
};
