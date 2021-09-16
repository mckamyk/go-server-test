import {LitElement, html, css} from 'lit';
import {property} from 'lit/decorators.js';
import {colors} from '../styles/colors';

export default class Card extends LitElement {
	@property({type: Boolean}) header = false;
	@property({type: Boolean}) footer = false;

	render() {
		return html`
			<div class="wrapper">
				${this.header ? html`
					<div class="header" part="header">
						<slot name="header"></slot>
					</div>
				` : ''}

				<div class="body" part="body">
					<slot></slot>
				</div>

				${this.footer ? html`
					<div class="footer" part="footer">
						<slot name="footer"></slot>
					</div>
				` : ''}
			</div>
		`;
	}

	static styles = [colors, css`
		.wrapper {
			height: inherit;
			width: inherit;
			background: var(--diag);
			box-shadow: 0 0 5px black;
		}
		.wrapper > * {
			padding: .5rem;
		}
		.header {
			position: relative;
			font-size: 1.25rem;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.header:before {
			content: '';
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 2px;
			background-image: linear-gradient(
				to right, 
				transparent 0%,
				var(--accent2) 10%,
				var(--accent) 30% 70%,
				var(--accent2) 90%,
				transparent 100%
			);
		}
		.footer {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.footer:before {
			content: '';
			position: absolute;
			top: 0;
			width: 100%;
			height: 2px;
			background-image: linear-gradient(
				to right, 
				transparent 0%,
				var(--accent2) 10%,
				var(--accent) 30% 70%,
				var(--accent2) 90%,
				transparent 100%
			);
		}
	`];
}
