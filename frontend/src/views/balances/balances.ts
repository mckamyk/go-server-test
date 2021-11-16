import {LitElement, html, css} from 'lit';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import TextField from '../../components/textfield';

export default class Balances extends scope(LitElement) {
	render() {
		return html`
			<text-field class="field" label="myLabel" placeholder="foobar"></text-field>
		`;
	}

	static styles = css`
		.field {
			width: 25rem;
			height: 10rem;
		}
	`;

	static get scopedElements() {
		return {
			'text-field': TextField,
		};
	}
}
