import { html, LitElement, unsafeCSS } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import { navItems } from './nav-list'

import type { TemplateResult } from 'lit'

import styles from 'global-css/style.css?inline'
import { globalNavStyles } from './gloabl-nav.litcss'

@customElement('global-nav')
export class GlobalNav extends LitElement {
	static override styles = [unsafeCSS(styles), globalNavStyles]

	@state() protocol: string = 'http:'

	@state() baseHost: string = ''

	@state() subdomain: string = ''

	private _parseHost(host: string): [string, string] {
		const [_, subdomain = '', baseHost = ''] =
			host.match(/([\w.-]*?)\.?([\w-]+\.[a-z]{2,}:?[0-9]{0,4})$/i) || []

		return [subdomain, baseHost]
	}

	private _url(_: TemplateStringsArray, subdomain: string, path = ''): string {
		return `${this.protocol}//${subdomain ? subdomain + '.' : ''}${
			this.baseHost
		}/${path}`
	}

	override connectedCallback(): void {
		super.connectedCallback()

		const host = window.location.host
		const [subdomain, baseHost] = this._parseHost(host)

		this.protocol = window.location.protocol
		this.subdomain = subdomain
		this.baseHost = baseHost
	}

	override render(): TemplateResult {
		return html`
			<nav class="nav">
				<ul class="nav__list">
					${navItems.map(({ subdomain, title, path }) => {
						const href = this._url`${subdomain}${path}`

						const classes = {
							active: subdomain === this.subdomain,
						}

						return html`
							<li class="nav__item ${classMap(classes)}">
								<a class="nav__link" href="${href}">${title}</a>
							</li>
						`
					})}
				</ul>
			</nav>
		`
	}
}

export type GlobalNavProps = Record<string, never>

declare global {
	interface HTMLElementTagNameMap {
		'global-nav': GlobalNav
	}
	namespace JSX {
		interface IntrinsicElements {
			'global-nav': GlobalNavProps
		}
	}
}
