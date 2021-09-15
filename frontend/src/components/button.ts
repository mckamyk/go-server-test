import {LitElement, html, css} from 'lit';
import {colors} from '../styles/colors';

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
        <span><slot></slot></span>
      </div>
    `;
	}

  static styles = [colors, css`
    .wrapper {
      position: relative;
      height: inherit;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;

      background: var(--accent);
    }
    .wrapper > * {
      z-index: 1;
    }
    .wrapper::after {
      position: absolute;
      content: '';
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 0;
      background: linear-gradient(to right, transparent 0%, var(--accent2) 100%);
      transition: width 300ms ease;
    }
    .wrapper::before {
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 0;
      background: linear-gradient(to right, var(--accent2) 0%, transparent 100%);
      transition: width 300ms ease;
    }
    .wrapper:hover::before {
      width: 25%;
    }
    .wrapper:hover::after {
      width: 25%;
    }
  `];
}
