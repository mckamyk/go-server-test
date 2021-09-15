import {LitElement, html} from 'lit';
import {query} from 'lit/decorators.js';
import {signer} from '../services/ethHandler';
// @ts-ignore
import jazzicon from '@metamask/jazzicon';

export default class AccountIcon extends LitElement {
	@query('span') container!: HTMLDivElement;

	async firstUpdated() {
		setTimeout(async () => {
			const address = await signer.getAddress();
			if (address) {
				const formatted = address.slice(2, 10);
				const el = jazzicon(30, parseInt(formatted, 16));
				if (this.container.childElementCount) {
					this.container.removeChild(this.container.children[0]);
				}

				this.container.appendChild(el);
			}
		}, 1000);
	}

	render() {
		return html`
			<span></span>
		`;
	}
}
