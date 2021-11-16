import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';

export default class TextField extends LitElement {
	@property() placeholder?: string;
	@property() label?: string;
	@property() value?: string;

	forwardEvent(ev: InputEvent) {
		const tgt = ev.target as HTMLInputElement;
		this.dispatchEvent(new CustomEvent<string>('change', {
			bubbles: true,
			composed: true,
			detail: tgt.value,
		}));
	}

	render() {
		return html`
			<div class="wrapper">
				${this.label ? html`
					<span class="label">${this.label}</span>
				` : ''}

				<div class="field">
					<input type="text" placeholder=${ifDefined(this.placeholder)} @input=${this.forwardEvent}/>
				</div>
			</div>
		`;
	}

	static styles = css`
		.wrapper {
			height: inherit;
			width: inherit;
		}
		.label {
			font-size: .75rem;
			padding-left: 10px;
		}
		.field {
			position: relative;
			background: var(--field);
			padding: .5rem;
			width: inherit;
			border-bottom: 1px solid transparent;
		}
		.field::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			width: 0;
			border-bottom: 1px solid var(--accent);
			transition: width 100ms linear;
		}
		.field:focus-within::after {
			width: 100%;
		}
		
		input {
			font-size: 1.25rem;
			width: inherit;
			background: none;
			outline: none;
			box-shadow: none;
			border: none;
			color: var(--white);
		}
	`;
}
