import { Command } from 'commander'

import { cmdSpawn } from '../helpers'

export function makeStagingCommand(): Command {
	const dev = new Command('staging')

	dev
		.description('staging mode')
		.option('--stop', 'stop vm')
		.option('--destroy', 'destroy vm')
		.option('--prepare', 'prepare vagrant')
		.action(action)

	return dev
}

interface Options {
	stop?: boolean
	destroy?: boolean
}

function action(options: Options): void {
	if (options.stop) {
		cmdSpawn('vagrant', ['halt'])
	} else if (options.destroy) {
		cmdSpawn('vagrant', ['destroy'])
	} else {
		cmdSpawn('vagrant', ['up'])
	}
}
