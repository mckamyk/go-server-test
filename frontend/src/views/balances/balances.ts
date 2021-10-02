import {LitElement, html, css} from 'lit';
import {state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {getBalance, getTokenBalances} from '../../services/api/balance';
import {ethers} from 'ethers';
import Card from '../../components/card';

export default class Balances extends scope(LitElement) {
	@state() resp: string = '';
	@state() balances: string = '';

	firstUpdated() {
		setTimeout(() => {
			getBalance().then(r => {
				this.resp = ethers.utils.formatEther(r);
			});
			getTokenBalances().then(r => {
				this.balances = JSON.stringify(r, undefined, 2);
			});
		}, 1000);
	}

	render() {
		return html`
			<card-el header footer>
				<div slot="header">Header</div>
				<pre>${this.resp}</pre>
				<pre>${this.balances}</pre>
				<div slot="footer">footer</div>
			</card-el>
		`;
	}

	static styles = css`
	`;

	static get scopedElements() {
		return {
			'card-el': Card,
		};
	}
}
