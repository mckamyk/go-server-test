import {LitElement, html, css} from 'lit';

export default class Foo extends LitElement {
	render() {
		return html`
      <div class="wrapper">
        Hi from foo
      </div>
    `;
	}

  static styles = css`
    .wrapper {
      background: blue;
    }
  `;
}
