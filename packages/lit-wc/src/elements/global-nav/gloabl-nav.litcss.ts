import { css } from 'lit'

export const globalNavStyles = css`
	:host {
		font-family: sans-serif;
	}

	.nav {
		border: 2px solid red;
	}

	.nav__list {
		list-style: none;
	}

	.nav__item {
		color: cyan;
	}

	.nav__item.active {
		pointer-events: none;
		color: red;
	}

	.nav__link {
		color: inherit;
		text-decoration: none;
	}
`
