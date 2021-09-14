import {router, registerRoute, routeTo} from './routerStore';

router(registerRoute({
	name: 'foo',
	path: '/foo',
	loader: () => import('../../views/foo'),
}));

router(registerRoute({
	name: 'bar',
	path: '/bar',
	loader: () => import('../../views/bar'),
}));

router(routeTo('foo'));
