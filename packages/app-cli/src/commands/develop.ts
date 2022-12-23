import { Command } from 'commander'

import { cmdSpawn } from '../helpers'

export function makeDevCommand(): Command {
	const dev = new Command('develop')

	dev
		.description('development mode')
		.option('-d, --docker', 'run with docker')
		.action(action)

	return dev
}

interface Options {
	docker?: boolean
}

function action(options: Options): void {
	if (options.docker) {
		cmdSpawn('yarn', ['dev', '--filter=lit-wc'])
		cmdSpawn('docker', [
			'compose',
			'-f',
			'docker-compose.yml',
			'-f',
			'docker-compose.dev.yml',
			'up',
			'--build',
		])
	} else {
		// TODO
	}
}
