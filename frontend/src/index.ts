import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import Nav from './views/nav';
import Router from './services/router/router';
import Cookies from 'js-cookie';
import Login from './views/Login';

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
				<div class="nav">
					<nav-el></nav-el>
				</div>
				<router-el></router-el>
			</div>
		`;
	}

	static styles = css`
		* {
			box-sizing: border-box;
			font-family: Arial, Helvetica, sans-serif;
			color: white;
		}
		.wrapper {
			width: 100vw;
			height: 100vh;
			background: #3d3d3d;
			display: flex;
		}
		.nav {
			width: 15%;
			height: 100%;
		}
	`;

	static get scopedElements() {
		return {
			'login-el': Login,
			'router-el': Router,
			'nav-el': Nav,
		};
	}
}
