import { css, html, LitElement, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('demo-element')
export class DemoElement extends LitElement {
	static override styles = css`
		:host {
			display: block;
			border: solid 1px gray;
			padding: 16px;
			max-width: 800px;
		}
	`

	/**
	 * The name to say "Hello" to.
	 */
	@property()
	name = 'World'

	/**
	 * The number of times the button has been clicked.
	 */
	@property({ type: Number })
	count = 0

	override render(): TemplateResult {
		return html`
			<h1>Hello, ${this.name}!</h1>
			<button @click=${this._onClick} part="button">
				Click Count: ${this.count}
			</button>
			<slot></slot>
		`
	}

	private _onClick(): void {
		this.count++
	}
}

type WebComponentProps<E, P extends keyof E> = Pick<E, P>

export type DemoElementProps = WebComponentProps<DemoElement, 'name' | 'slot'>

declare global {
	interface HTMLElementTagNameMap {
		'demo-element': DemoElement
	}
	/* eslint-disable @typescript-eslint/no-namespace */
	namespace JSX {
		interface IntrinsicElements {
			'demo-element': DemoElementProps
		}
	}
}
