import {LitElement, html, css} from 'lit';
import {state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {store, RootState, router, routeTo} from '../services/router/routerStore';
import {routes, Route} from '../services/router/routes';
import {connect} from 'pwa-helpers';

export default class Nav extends connect(store)(scope(LitElement)) {
	@state() currentRoute?: Route;

	goTo(name: string) {
		router(routeTo(name));
	}

	stateChanged(state: RootState) {
		if (state.router.currentRoute !== this.currentRoute) {
			this.currentRoute = state.router.currentRoute;
		}
	}

	render() {
		return html`
			<div class="wrapper">
				${routes.map(route => this.renderRoute(route))}
			</div>
		`;
	}

	handleClick(ev: MouseEvent, route: Route) {
		ev.stopPropagation();
		this.goTo(route.name);
	}

	renderRoute(route: Route) {
		const isActive = this.currentRoute === route;

		return html`
			<div class="route ${isActive ? 'active' : ''}" @click=${(ev: MouseEvent) => this.handleClick(ev, route)}>
				${route.name}
			</div>
		`;
	}

	static styles = css`
		.wrapper {
			height: 100%;
			width: 20rem;
			background: var(--diag);
		}
		.route {
			padding: 1rem;
			font-size: 1.5rem;
		}
		.route:hover {
			background: gray;
		}
		.route:not(:last-child) {
			border-bottom: 1px solid gray;
		}
		.route.active {
			background: var(--accent);
		}
	`;
}
