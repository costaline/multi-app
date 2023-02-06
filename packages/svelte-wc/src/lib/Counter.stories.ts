import Counter from './Counter.svelte'

import type { Meta, StoryObj } from '@storybook/svelte'

const meta = {
	title: 'Counter',
	component: Counter,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<Counter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}
