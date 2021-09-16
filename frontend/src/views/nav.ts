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
      </div>
    `;
	}

  static styles = css`
    .wrapper {
      height: 100%;
      width: 5rem;
      background: var(--diag);
    }
    button {
      width: 100%;
      display: block;
      height: 10rem;
    }
  `;
}
