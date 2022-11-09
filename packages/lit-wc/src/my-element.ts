import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators'

import litLogo from './assets/lit.svg'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
	/**
	 * Copy for the read the docs hint.
	 */
	@property()
	docsHint = 'Click on the Vite and Lit logos to learn more'

	/**
	 * The number of times the button has been clicked.
	 */
	@property({ type: Number })
	count = 0

	override render() {
		return html`
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src="/vite.svg" class="logo" alt="Vite logo" />
				</a>
				<a href="https://lit.dev" target="_blank">
					<img src=${litLogo} class="logo lit" alt="Lit logo" />
				</a>
			</div>
			<slot></slot>
			<div class="card">
				<button @click=${this._onClick} part="button">
					count is ${this.count}
				</button>
			</div>
			<p class="read-the-docs">${this.docsHint}</p>
		`
	}

	private _onClick() {
		this.count++
	}

	static override styles = css`
		:host {
			max-width: 1280px;
			margin: 0 auto;
			padding: 2rem;
			text-align: center;
		}

		.logo {
			will-change: filter;
			height: 6em;
			padding: 1.5em;
		}

		.logo:hover {
			filter: drop-shadow(0 0 2em #646cffaa);
		}

		.logo.lit:hover {
			filter: drop-shadow(0 0 2em #325cffaa);
		}

		.card {
			padding: 2em;
		}

		.read-the-docs {
			color: #888888;
		}

		h1 {
			font-size: 3.2em;
			line-height: 1.1;
		}

		a {
			font-weight: 500;
			color: #646cff;
			text-decoration: inherit;
		}

		a:hover {
			color: #535bf2;
		}

		button {
			cursor: pointer;

			padding: 0.6em 1.2em;

			font-family: inherit;
			font-size: 1em;
			font-weight: 500;

			background-color: #1a1a1a;
			border: 1px solid transparent;
			border-radius: 8px;

			transition: border-color 0.25s;
		}

		button:hover {
			border-color: #646cff;
		}

		button:focus,
		button:focus-visible {
			outline: 4px auto -webkit-focus-ring-color;
		}

		@media (prefers-color-scheme: light) {
			a:hover {
				color: #747bff;
			}

			button {
				background-color: #f9f9f9;
			}
		}
	`
}

type WebComponent<E, P extends keyof E> = Pick<E, P>

declare global {
	interface HTMLElementTagNameMap {
		'my-element': MyElement
	}
	/* eslint-disable @typescript-eslint/no-namespace */
	namespace JSX {
		interface IntrinsicElements {
			'my-element': WebComponent<MyElement, 'docsHint'>
		}
	}
}
