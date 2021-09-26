import {LitElement, html, css} from 'lit';
import {state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {getBalances} from '../../services/api/balance';
import Card from '../../components/card';

export default class Balances extends scope(LitElement) {
	@state() resp: string = '';

	firstUpdated() {
		const delta = Math.floor(60 * 60 * 24 * 1 / 13);
		setTimeout(() => {
			getBalances(delta).then(r => {
				this.resp = r;
			});
		}, 1000);
	}

	render() {
		return html`
			<card-el header footer>
				<div slot="header">Header</div>
				<pre>${this.resp}</pre>
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
