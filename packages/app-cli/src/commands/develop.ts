import { Command } from 'commander'

import { cmdSpawn } from '../helpers/cmd'

export function makeDevCommand(): Command {
	const dev = new Command('develop')

	dev
		.description('development mode')
		.option('-d, --docker', 'run with docker')
		.option('-f, --filter <apps...>', 'specify apps')
		.action(action)

	return dev
}

interface Options {
	docker?: boolean
	filter?: string[]
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
		if (options.filter?.length) {
			const apps = options.filter.map((app) => `--filter=${app}`)

			cmdSpawn('yarn', ['dev', ...apps])
		} else {
			cmdSpawn('yarn', ['dev', '--filter=docs'])
		}
	}
}
