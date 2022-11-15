import './demo-element'

import type { Meta, Story } from '@storybook/web-components'
import { html } from 'lit'

import type { DemoElementProps } from './demo-element'

export default {
	title: 'Demo Element',
	argTypes: {
		name: {
			type: 'string',
			defaultValue: 'World',
		},
		slot: {
			type: 'string',
			description: 'Additional text',
		},
	},
	parameters: {
		layout: 'centered',
	},
} as Meta<DemoElementProps>

const Template: Story<Partial<DemoElementProps>> = (args) => {
	return html`<demo-element name=${args['name']}></demo-element>`
}

export const Default = Template.bind({})
Default.args = {}
