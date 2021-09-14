import {LitElement, html, css} from 'lit';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {router, routeTo} from '../services/router/routerStore';

@scope
export default class Nav extends LitElement {
	goTo(name: string) {
		router(routeTo(name));
	}

	render() {
		return html`
      <div class="wrapper">
        <button @click=${() => this.goTo('foo')}>Foo</button>
        <button @click=${() => this.goTo('bar')}>Bar</button>
      </div>
    `;
	}

  static styles = css`
    .wrapper {
      height: 100%;
      background-color: gray;
    }
    button {
      width: 100%;
      display: block;
      height: 10rem;
    }
  `;
}
