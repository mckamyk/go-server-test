import {LitElement, html, css} from 'lit';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import Button from '../components/button';
import {connect} from '../services/ethHandler';
import {loginStart} from '../services/auth';
import AccountIcon from '../components/accountIcon';

export default class Header extends scope(LitElement) {
	async login() {
		await connect();
		await loginStart();
	}

	render() {
		return html`
			<div class="wrapper">
				<span class="left spread">
					left
				</span>
				<span class="middle spread">
					middle
				</span>
				<span class="right spread">
					<button-el @click=${this.login} class="login">Login with Metamask</button-el>
					<account-icon></account-icon>
				</span>
			</div>
		`;
	}

	static styles = css`
		.wrapper {
			position: relative;
			height: 3rem;
			box-shadow: 5rem 0 5px black;
		}
		.wrapper > * {
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto;
			width: fit-content;
			height: fit-content;
		}
		.left {
			left: 1rem;
		}
		.middle {
			left: 0;
			right: 0;
		}
		.right {
			display: flex;
			right: 1rem;
		}
		.login {
			height: 2rem;
		}
		.right > *:not(:last-child) {
			margin-right: 1rem;
		}
	`;

	static get scopedElements() {
		return {
			'button-el': Button,
			'account-icon': AccountIcon,
		};
	}
}
