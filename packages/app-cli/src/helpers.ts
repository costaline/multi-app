#!/usr/bin/env ts-node
import { exec, spawn } from 'child_process'
import fs from 'fs/promises'

import { log } from './log'

export function cmdSpawn(command: string, args: string[]): void {
	const cmd = spawn(command, args, { stdio: 'inherit', shell: true })

	cmd.stdout?.on('data', (data) => {
		log(data)
	})

	cmd.stderr?.on('data', (data) => {
		log.error(`stderr: ${data}`)
	})

	cmd.on('close', (code) => {
		log(`child process exited with code ${code}`)
	})
}

export function cmd(...args: Array<string | number>): void {
	exec(args.join(' '), (error, stdout, stderr) => {
		if (error) return log.error(`error: ${error.message}`)
		if (stderr) return log.error(`stderr: ${stderr}`)

		console.log(stdout)
	})
}

export async function cmdAsync(
	...args: Array<string | number>
): Promise<string> {
	return await new Promise((resolve, reject) => {
		exec(args.join(' '), (error, stdout, stderr) => {
			if (error) {
				log.error(`error: ${error.message}`)
				reject(error)
			}

			if (stderr) {
				log.error(`stderr: ${stderr}`)
				reject(stderr)
			}

			console.log(stdout)
			resolve(stdout)
		})
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
