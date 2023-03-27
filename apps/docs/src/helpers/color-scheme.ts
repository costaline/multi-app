const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

type Theme = 'dark' | 'light'

export function setThemeAttr(theme: Theme): void {
	document.documentElement.setAttribute('data-color-scheme', theme)

	localStorage.setItem('theme', theme)
}

const theme =
	(localStorage?.getItem('theme') as Theme | undefined) ||
	(themeMediaQuery.matches ? 'dark' : 'light')

setThemeAttr(theme)

const handleChangeColorScheme = (event: MediaQueryListEvent): void => {
	setThemeAttr(event.matches ? 'dark' : 'light')
}

themeMediaQuery.addEventListener('change', handleChangeColorScheme)
