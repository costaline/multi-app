#!/usr/bin/env ts-node
import { createRequire } from 'module'
import { Command } from 'commander'

import { ENVS_BY_APP } from './constants'
import { append, cmd, getEnvDateTitle, read } from './helpers'

const require = createRequire(import.meta.url)
const { version } = require('../package.json')

const program = new Command()

program
	.name('app-cli')
	.description('cli to simplify work with this project')
	.version(version)

program
	.command('echo')
	.description('print message')
	.argument('[message]', 'some additional message')
	.action((message?: string) => {
		cmd('echo', message || '42')
	})

program
	.command('prepare-envs')
	.description('prepare env file for target app')
	.argument('<app>', 'target app')
	.option('-r, --rewrite', 'rewrite file content')
	.option('-c, --clear', 'clear file content')
	.action(
		async (app: string, options: { rewrite?: boolean; clear?: boolean }) => {
			if (options.clear) {
				try {
					await append(`./apps/${app}/.env`, '', true)
				} catch (e) {
					if (e instanceof Error) console.log('Prepare envs error:', e.message)
					else console.log('something went wrong...')
				}

				return
			}

			const files = ENVS_BY_APP[app]

			if (!files) return

			const dateTitle = getEnvDateTitle()

			try {
				const promises = files.map(
					async (fileName) => await read(`./.envs/${app}/${fileName}`)
				)

				const envData = await Promise.all(promises)

				const envDataExtended = files
					.map((filename, idx) => {
						return `# copied from \"${filename}\"\n${envData[idx]}`
					})
					.join('\n')

				const content = `${dateTitle}\n${envDataExtended}`

				await append(`./apps/${app}/.env`, content, options.rewrite)
			} catch (e) {
				if (e instanceof Error) console.log('Prepare envs error:', e.message)
				else console.log('something went wrong...')
			}
		}
	)

program.parse(process.argv)
