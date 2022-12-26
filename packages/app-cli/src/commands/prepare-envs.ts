import { Command } from 'commander'

import { ENVS_BY_APP } from '../constants'
import { append, read } from '../helpers/file'
import { log } from '../helpers/log'
import { getEnvDateTitle } from '../helpers/misc'

export function makePrepareEnvsCommand(): Command {
	const prepareEnvs = new Command('prepare-envs')

	prepareEnvs
		.description('prepare env file for target app')
		.argument('<app>', 'target app')
		.option('-r, --rewrite', 'rewrite file content')
		.option('-c, --clear', 'clear file content')
		.action(action)

	return prepareEnvs
}

async function action(
	app: string,
	options: { rewrite?: boolean; clear?: boolean }
): Promise<void> {
	if (options.clear) return await clear(app)

	const files = ENVS_BY_APP[app]

	if (!files) return

	const dateTitle = getEnvDateTitle()

	try {
		const envData = await getEnvData(app, files)

		const content = `${dateTitle}\n${envData}`

		await append(`./apps/${app}/.env`, content, options.rewrite)
	} catch (e) {
		if (e instanceof Error) log.error('Prepare envs error:', e.message)
		else log.error('something went wrong...')
	}
}

async function getEnvData(
	app: string,
	files: string[]
): Promise<string | undefined> {
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

		return envDataExtended
	} catch (e) {
		if (e instanceof Error) {
			log.error('Get envs data error:', e.message)

			return undefined
		} else {
			throw e
		}
	}
}

async function clear(app: string): Promise<void> {
	try {
		await append(`./apps/${app}/.env`, '', true)
	} catch (e) {
		if (e instanceof Error) log.error('Clear target envs error:', e.message)
		else log.error('something went wrong...')
	}
}
