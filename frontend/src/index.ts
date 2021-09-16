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
						<router-el></router-el>
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
			flex-grow: 1;
			padding: 1rem;
			overflow-y: auto;
			background: var(--bg);
			box-shadow: inset 0 0 5px black;
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
