import {LitElement, html, css} from 'lit';
import {state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import Card from '../../components/card';
import TextField from '../../components/textfield';
import Button from '../../components/button';
import {safeFetch} from '../../services/api/safeFetch';
import {Chain} from '../../types/models';

export default class NewChain extends scope(LitElement) {
	@state() name: string = '';
	@state() baseCurrency: string = '';
	@state() providerUrl: string = '';
	@state() providerUser: string = '';
	@state() providerPass: string = '';

	async addChain() {
		const chain: Chain = {
			name: this.name,
			website: '',
			baseCurrency: this.baseCurrency,
			provider: {
				url: this.providerUrl,
				user: this.providerUser,
				pass: this.providerPass,
			},
		};
		const reps = await safeFetch('/api/chains/new', 'post', chain);
	}

	render() {
		return html`
			<card-el footer>
				<div class="header" slot="header">
					Register a Chain
				</div>

				<div class="body">
					<div class="chain">
						<text-field label="Chain Name" placeholder="Mainnet" value=${this.name} @change=${(ev: CustomEvent<string>) => this.name = ev.detail}></text-field>
						<text-field label="Base Currency" placeholder="ETH" value=${this.baseCurrency} @change=${(ev: CustomEvent<string>) => this.baseCurrency = ev.detail}></text-field>
					</div>
					<div class="provider">
						<text-field label="Provider URL" placeholder="<api url>" value=${this.providerUrl} @change=${(ev: CustomEvent<string>) => this.providerUrl = ev.detail}></text-field>
						<text-field label="Provider User" placeholder="<api username>" value=${this.providerUser} @change=${(ev: CustomEvent<string>) => this.providerUser = ev.detail}></text-field>
						<text-field label="Provider Pass" placeholder="<api password>" value=${this.providerPass} @change=${(ev: CustomEvent<string>) => this.providerPass = ev.detail}></text-field>
					</div>
				</div>

				<div class="footer" slot="footer">
					<button-el class="save" @click=${this.addChain}>Save</button-el>
				</div>
			</card-el>
		`;
	}

	static styles = css`
		.body {
			padding: 1rem;
		}
		.save {
			height: 1.5rem;
			font-size: 1.25rem;
		}
		.footer {
			display: flex;
			justify-content: flex-end;
			width: 100%;
		}
		.chain {
			margin-bottom: 2rem;
		}
		.chain, .provider {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 2px solid var(--accent2);
			padding: 1rem;
			border-radius: 1rem;
		}
		.chain > *:first-child {
			margin-right: 2rem;
		}
		.chain::before, .provider::before {
			content: "Chain Information";
			position: absolute;
			display: inline;
			background-color: var(--diag);
			top: -12px;
			left: 20px;
			margin: auto;
			font-size: 1.25rem;
		}
		.provider::before {
			content: "Provider Information";
		}
		.provider {
			flex-wrap: wrap;
		}
		.provider > *:first-child {
			width: 100%;
		}
		.provider > *:not(:first-child) {
			box-sizing: border-box;
			flex-grow: 1;
		}
	`;

	static get scopedElements() {
		return {
			'card-el': Card,
			'text-field': TextField,
			'button-el': Button,
		};
	}
}
