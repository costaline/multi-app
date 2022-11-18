import './demo-element'

import { html } from 'lit'

import type { DemoElementProps } from './demo-element'
import type { Meta, StoryObj } from '@storybook/web-components'

const meta: Meta<DemoElementProps> = {
	title: 'Demo Element',
	tags: ['docsPage'],
	parameters: {
		// layout: 'centered',
	},
	render: (args: DemoElementProps) => {
		return html`
			<demo-element name=${args['name']}>${args['children']}</demo-element>
		`
	},
	argTypes: {
		name: {
			type: 'string',
			defaultValue: 'World',
		},
		children: {
			type: 'string',
			defaultValue: 'some text',
		},
	},
}

export default meta

type Story = StoryObj<DemoElementProps>

export const Default: Story = {
	args: {},
}
