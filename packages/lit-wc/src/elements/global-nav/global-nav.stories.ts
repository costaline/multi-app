import './global-nav'

import { html } from 'lit'

import type { GlobalNavProps } from './global-nav'
import type { Meta, StoryObj } from '@storybook/web-components'

const meta: Meta<GlobalNavProps> = {
	title: 'Global Nav',
	tags: ['autodocs'],
	parameters: {
		// layout: 'centered',
	},
	render: () => {
		return html`<global-nav></global-nav>`
	},
}

export default meta

type Story = StoryObj<GlobalNavProps>

export const Default: Story = {
	args: {},
}
