import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {isConnected} from './services/ethHandler';
import Login from './views/Login';

@customElement('root-element')
export default class RootEl extends scope(LitElement) {
	@state() connected = false;

	async updated() {
		this.connected = await isConnected();
	}

	render() {
		return html`
			<div class="wrapper">
				<login-el></login-el>
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
			align-items: center;
			justify-content: center;
		}
	`;

	static get scopedElements() {
		return {
			'login-el': Login,
		};
	}
}
