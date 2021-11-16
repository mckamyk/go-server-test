import {safeFetch} from './safeFetch';
import {Chain} from '../../types/models';

export const getAllChains = async (): Promise<Chain[]> => {
	const resp = await safeFetch('/api/chains/').then(r => r.json()) as Chain[];
	return resp;
};
