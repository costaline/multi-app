import { expect, test } from '@playwright/test'

test.describe('The Home Page', () => {
	test('successfully loads', async ({ page }) => {
		await page.goto('/')

		await expect(page).toBeDefined()
	})
})
