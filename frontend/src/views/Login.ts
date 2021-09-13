import {LitElement, html, css} from 'lit';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import Button from '../components/button';
import {connect} from '../services/ethHandler';
import {loginStart} from '../services/auth';

export default class Login extends scope(LitElement) {
	async login() {
		await connect();
		await loginStart();
	}

	render() {
		return html`
			<div class="wrapper">
				<button-el @click=${this.login}>Login with Metamask</button-el>
			</div>
		`;
	}

	static styles = css``;

	static get scopedElements() {
		return {
			'button-el': Button,
		};
	}
}
