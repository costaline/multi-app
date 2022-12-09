import { Command } from 'commander'

import { cmd } from '../helpers'

export function makeEchoCommand(): Command {
	const echo = new Command('echo')

	echo
		.description('print message')
		.argument('[message]', 'some additional message')
		.action(action)

	return echo
}

function action(message?: string): void {
	cmd('echo', message || 42)
}
