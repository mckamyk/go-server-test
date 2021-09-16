import {LitElement, html, css} from 'lit';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import Card from '../../components/card';

export default class Balances extends scope(LitElement) {
	render() {
		return html`
			<card-el header footer>
				<div slot="header">Header</div>
				<div>Body</div>
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
