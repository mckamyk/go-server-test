import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';

@customElement('root-element')
export default class RootEl extends scope(LitElement) {
	@state() foo = '';
	@state() home = '';

	async firstUpdated() {
		this.foo = await fetch('/api/foo', {
			method: 'post',
			body: JSON.stringify({test: 'foo'}),
		}).then(r => r.text());
		this.home = await fetch('/api').then(r => r.text());
	}

	render() {
		return html`
			<div class="wrapper">
				<div class="box">
					<div class="welcome">
						Welcome!
					</div>
					<div class="api">
						<div>${this.home}</div>
						<div>${this.foo}</div>
					</div>
				</div>
			</div>
		`;
	}

	static styles = css`
		* {
			box-sizing: border-box;
			font-family: Arial, Helvetica, sans-serif;
			color: white;
		}
		.wrapper {
			width: 100vw;
			height: 100vh;
			background: #3d3d3d;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.welcome {
			font-size: 8rem;
		}
	`;
}
