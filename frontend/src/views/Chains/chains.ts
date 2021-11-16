import {LitElement, html, css} from 'lit';
import {state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {getAllChains} from '../../services/api/chains';
import Button from '../../components/button';
import Modal from '../../components/modal';
import Card from '../../components/card';
import NewChain from './newChain';

export default class Chains extends scope(LitElement) {
	@state() chains?: any[];
	@state() newModal: boolean = false;

	firstUpdated() {
		getAllChains().then(chains => {
			this.chains = chains;
		});
	}

	toggleModal() {
		this.newModal = !this.newModal;
	}

	render() {
		return html`
			<div>
				${this.newModal ? html`
					<modal-el @close=${this.toggleModal}>
						<new-chain></new-chain>
					</modal-el>
				` : ''}

				${this.chains?.length === 0 ? html`
					<div class="none">
						<span>There aren't any chains registered yet!</span>
						<button-el @click=${this.toggleModal}>Add One</button-el>
					</div>
					` : html`
					${JSON.stringify(this.chains, undefined, 2)}
					`}
			</div>
		`;
	}

	static styles = css`
		:host {
			height: 100%;
		}
		.none {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
		.none > *:first-child {
			margin-bottom: 2rem;
			font-size: 2rem;
		}
		.none > *:last-child {
			font-size: 1.5rem;
		}
	`;

	static get scopedElements() {
		return {
			'button-el': Button,
			'modal-el': Modal,
			'card-el': Card,
			'new-chain': NewChain,
		};
	}
}
