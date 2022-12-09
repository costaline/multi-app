#!/usr/bin/env ts-node
/* eslint-disable no-console */
import { exec } from 'child_process'
import fs from 'fs/promises'

export function cmd(...args: Array<string | number>): void {
	exec(args.join(' '), (error, stdout, stderr) => {
		if (error) return console.log(`error: ${error.message}`)
		if (stderr) return console.log(`stderr: ${stderr}`)

		console.log(stdout)
	})
}

export function getEnvDateTitle(length: number = 80): string {
	const date = ` ${new Date().toUTCString()} `
	const right = Math.floor((length - date.length) / 2)
	const dateTitle = date.padStart(length - right, '#').padEnd(length, '#')

	return dateTitle
}

export async function read(pathToFile: string): Promise<string> {
	try {
		const data = await fs.readFile(pathToFile, { encoding: 'utf8' })

		return data
	} catch (err) {
		console.log(err)

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
		console.log(err)

		return false
	}
}
