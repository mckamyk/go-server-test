import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {connect} from 'pwa-helpers';
import {store, RootState} from './services/redux/store';
import {colors} from './styles/colors';
import Nav from './views/nav';
import Router from './services/router/router';
import Login from './views/Login';
import Header from './views/header';

@customElement('root-element')
export default class RootEl extends connect(store)(scope(LitElement)) {
	@state() private authenticated: boolean = false;

	stateChanged(state: RootState) {
		if (this.authenticated !== state.accountReducer.authenticated) {
			this.authenticated = state.accountReducer.authenticated;
		}
	}

	render() {
		if (!this.authenticated) {
			return html`
				<div class="loginWrapper">
					<login-el class="login"></login-el>
				</div>
			`;
		}

		return html`
			<div class="wrapper">
				<header-el></header-el>
				<div class="body">
					<div class="nav">
						<nav-el></nav-el>
					</div>
					<div class="view">
						<div class="viewWrapper">
							<router-el></router-el>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	static styles = [colors, css`
		* {
			box-sizing: border-box;
			font-family: Arial, Helvetica, sans-serif;
			color: white;
			font-size: 15px;
		}
		.wrapper {
			width: 100vw;
			height: 100vh;
			display: flex;
			flex-flow: column nowrap;
		}
		.loginWrapper {
			display: flex;
			height: 100vh;
			width: 100vw;
			background-color: var(--bg);
			align-items: center;
			justify-content: center;
			font-size: 3rem;
		}
		.login {
			font-size: 2rem;
		}
		.body {
			flex-grow: 1;
			display: flex;
		}
		.view {
			height: calc(100vh - 3rem);
			flex-grow: 1;
			background: var(--bg);
			position: relative;
		}
		.view::before {
			content: '';
			position: absolute;
			top: 0;
			width: 100%;
			height: 5px;
			background: linear-gradient(black, rgba(0, 0, 0, 0));
		}
		.nav {
			position: relative;
		}
		.nav::after {
			content: '';
			position: absolute;
			height: calc(100vh - 3rem);
			width: 5px;
			top: 0;
			right: -5px;
			z-index: 1;
			background: linear-gradient(to right, black, rgba(0, 0, 0, 0));
		}
		.viewWrapper {
			height: inherit;
			overflow-y: auto;
			padding: 1rem;
		}
	`];

	static get scopedElements() {
		return {
			'login-el': Login,
			'router-el': Router,
			'nav-el': Nav,
			'header-el': Header,
		};
	}
}
