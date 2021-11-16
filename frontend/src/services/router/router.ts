import {LitElement, html, css} from 'lit';
import {state, query} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {connect} from 'pwa-helpers';
import {store, Route, RootState} from './routerStore';
import './routes';

export default class Router extends connect(store)(scope(LitElement)) {
	@state() private route?: Route;
	@state() private compName?: string;

	@query('.wrapper') wrapper!: HTMLDivElement

	stateChanged(state: RootState) {
		this.route = state.router.currentRoute;
		this.mount();
	}

	async mount() {
		if (!this.route) {
			return;
		}

		let compName = this.route.name.split('-');
		if (compName.length === 1) {
			compName.push('el');
		} else if (compName.length > 2) {
			compName = [compName[0], compName[1]];
		}

		const name = compName.join('-');
		this.compName = name;

		const el = await this.route.loader();
		this.defineScopedElement(name, el.default);
	}

	render() {
		if (!this.route) {
			return html`404`;
		}

		return html`
			<div class="wrapper">
				${unsafeHTML(`<${this.compName}></${this.compName}`)}
			</div>
    `;
	}

	static styles = css`
		.wrapper {
			height: 100%;
		}
	`;
}
