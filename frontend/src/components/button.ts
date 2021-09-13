import {LitElement, html, css} from 'lit';

export default class Button extends LitElement {
	clicked(ev: MouseEvent) {
		ev.stopPropagation();
		this.dispatchEvent(new CustomEvent<void>('click', {
			bubbles: true,
			composed: true,
		}));
	}

	render() {
		return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
	}

  static styles = css`
    .wrapper {
      background: #4d81ac;
      padding: 1rem;
      cursor: pointer;
    }
    .wrapper:hover {
      filter: brightness(125%)
    }
  `;
}
