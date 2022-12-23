import { Command } from 'commander'
import inquirer from 'inquirer'

import { RUNNABLE_APPS } from '../constants'
import { cmdSpawn } from '../helpers/cmd'
import { log } from '../helpers/log'

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
		runWithFilter(['lit-wc'])
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
		runInteractive()
	} else {
		if (options.filter?.length) {
			runWithFilter(options.filter)
		} else {
			runWithFilter(['docs'])
		}
	}
}

function runWithFilter(apps: string[]): void {
	const appsWithFilter = apps.map((app) => `--filter=${app}`)

	cmdSpawn('yarn', ['dev', ...appsWithFilter])
}

function runInteractive(): void {
	inquirer
		.prompt([
			{
				type: 'checkbox',
				message: 'Select apps',
				name: 'apps',
				choices: prepareAppChoices(),
				validate: validateAnswers,
			},
		])
		.then((answers) => {
			runWithFilter(answers['apps'])
		})
		.catch(inquirerCatch)
}

type InquirerChoices = Array<inquirer.Separator | { name: string }>

function prepareAppChoices(): InquirerChoices {
	return Object.entries(RUNNABLE_APPS).reduce<InquirerChoices>(
		(acc, [type, apps]) => [
			...acc,
			new inquirer.Separator(` = ${type} apps = `),
			...apps.map((app) => ({ name: app })),
		],
		[]
	)
}

function inquirerCatch(error: any): void {
	if (error.isTtyError) {
		log("Prompt couldn't be rendered in the current environment")
	} else {
		log('Something else went wrong')
	}
}

function validateAnswers(answers: string[]): true | string {
	if (answers.length < 1) {
		return 'You must choose at least one app.'
	}

	return true
}
