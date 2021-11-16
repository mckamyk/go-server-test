import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';

export default class Modal extends LitElement {
	@property({type: Boolean}) header = false;
	@property({type: Boolean}) footer = false;

	close() {
		this.dispatchEvent(new CustomEvent('close', {
			bubbles: true,
			composed: true,
		}));
	}

	catchClick(ev: MouseEvent) {
		ev.stopPropagation();
	}

	render() {
		return html`
			<div class="wrapper" @click=${this.close}>
				<slot @click=${this.catchClick}></slot>
			</div>
		`;
	}

	static styles = css`
		.wrapper {
			position: fixed;
			top: 0;
			left: 0;
			height: 100vh;
			width: 100vw;
			background: #0008;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	`;
}
