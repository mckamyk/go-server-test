import {LitElement, html, css} from 'lit';

export default class Foo extends LitElement {
	render() {
		return html`
      <div class="wrapper">
        hi from bar
      </div>
    `;
	}

  static styles = css`
    .wrapper {
      background: red;
    }
  `;
}
