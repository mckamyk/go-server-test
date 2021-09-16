import {router, registerRoute, routeTo} from './routerStore';

router(registerRoute({
	name: 'balances',
	path: 'foo',
	loader: () => import('../../views/balances/balances'),
}));

router(routeTo('balances'));
