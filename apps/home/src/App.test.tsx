import { fireEvent, render, screen } from '@testing-library/react'

import App from './App'

describe('Test app component', () => {
	test('The component has the main title', () => {
		render(<App />)

		expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
	})

	test('Counter works', () => {
		render(<App />)

		const $btn = screen.getByText(/count is/i)

		expect($btn.textContent).toContain(0)
		fireEvent.click($btn)
		expect($btn.textContent).toContain(1)
	})

	test('Snapshot', () => {
		const view = render(<App />)

		expect(view).toMatchSnapshot()
	})
})
