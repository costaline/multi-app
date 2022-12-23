import { Command } from 'commander'
import inquirer from 'inquirer'

import { RUNNABLE_APPS } from '../constants'
import { cmdSpawn } from '../helpers/cmd'

export function makeDevCommand(): Command {
	const dev = new Command('develop')

	dev
		.description('development mode')
		.option('-d, --docker', 'run with docker')
		.option('-f, --filter <apps...>', 'specify apps')
		.option('-i, --interactive', 'specify apps interactively')
		.action(action)

	return dev
}

interface Options {
	docker?: boolean
	filter?: string[]
	interactive?: boolean
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
	} else if (options.interactive) {
		inquirer
			.prompt([
				{
					type: 'checkbox',
					message: 'Select apps',
					name: 'apps',
					choices: [
						...Object.entries(RUNNABLE_APPS).reduce<
							Array<inquirer.Separator | { name: string }>
						>((acc, [type, apps]) => {
							return [
								...acc,
								new inquirer.Separator(` = ${type} apps = `),
								...apps.map((app) => ({ name: app })),
							]
						}, []),
					],
				},
			])
			.then((answers) => {
				const apps = answers['apps'].map((app: string) => `--filter=${app}`)

				cmdSpawn('yarn', ['dev', ...apps])
			})
			.catch((error) => {
				if (error.isTtyError) {
					console.log("Prompt couldn't be rendered in the current environment")
				} else {
					console.log('Something else went wrong')
				}
			})
	} else {
		if (options.filter?.length) {
			const apps = options.filter.map((app) => `--filter=${app}`)

			cmdSpawn('yarn', ['dev', ...apps])
		} else {
			cmdSpawn('yarn', ['dev', '--filter=docs'])
		}
	}
}
