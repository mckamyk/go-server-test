import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
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
					<router-el></router-el>
				</div>
			</div>
		`;
	}

	static styles = css`
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
			background: #3d3d3d;
		}
		.body {
			flex-grow: 1;
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
			'header-el': Header,
		};
	}
}
