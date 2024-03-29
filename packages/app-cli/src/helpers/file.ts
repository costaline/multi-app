import { existsSync } from 'fs'
import fs from 'fs/promises'

import { log } from './log'

export function isExist(path: string): boolean {
	const res = existsSync(path)

	if (!res) log.error(`file \"${path}\" doesn't exist`)

	return res
}

export async function read(pathToFile: string): Promise<string> {
	try {
		const data = await fs.readFile(pathToFile, { encoding: 'utf8' })

		return data
	} catch (err) {
		log.error(err)

		return ''
	}
}

export async function append(
	pathToFile: string,
	content: string,
	rewrite?: boolean
): Promise<boolean> {
	try {
		if (rewrite) await fs.writeFile(pathToFile, content)
		else await fs.appendFile(pathToFile, content)

		return true
	} catch (err) {
		log.error(err)

		return false
	}
}
