import {LitElement, html, css} from 'lit';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';

@scope
export default class Providers extends LitElement {
	render() {
		return html`<div>hi from providers</div>`;
	}

  static styles = css``
}
