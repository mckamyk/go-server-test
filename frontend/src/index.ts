import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {colors} from './styles/colors';
import Nav from './views/nav';
import Router from './services/router/router';
import Cookies from 'js-cookie';
import Login from './views/Login';
import Header from './views/header';

@customElement('root-element')
export default class RootEl extends scope(LitElement) {
	@state() isLoggedIn: boolean = false;
	@state() rootTest: string = 'fetching...'

	checkLoggedIn() {
		if (Cookies.get('auth')) {
			return true;
		}

		return false;
	}

	firstUpdated() {
		this.isLoggedIn = this.checkLoggedIn();
	}

	render() {
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
