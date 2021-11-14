import {router, registerRoute, routeTo} from './routerStore';

export interface Route {
	name: string;
	path: string;
	loader: () => any;
}

export const routes: Route[] = [
	{
		name: 'balances',
		path: 'foo',
		loader: () => import('../../views/balances/balances'),
	},
	{
		name: 'Providers',
		path: 'providers',
		loader: () => import('../../views/Providers/providers'),
	},
];

routes.forEach(route => {
	router(registerRoute(route));
});

router(routeTo('balances'));
