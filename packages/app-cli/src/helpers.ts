#!/usr/bin/env ts-node
/* eslint-disable no-console */
import { exec } from 'child_process'

export function cmd(...args: Array<string | number>): void {
	exec(args.join(' '), (error, stdout, stderr) => {
		if (error) return console.log(`error: ${error.message}`)
		if (stderr) return console.log(`stderr: ${stderr}`)

		console.log(stdout)
	})
}
