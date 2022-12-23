import { exec, spawn } from 'child_process'

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

export function cmdExec(...args: Array<string | number>): void {
	exec(args.join(' '), (error, stdout, stderr) => {
		if (error) return log.error(`error: ${error.message}`)
		if (stderr) return log.error(`stderr: ${stderr}`)

		log(stdout)
	})
}

export async function cmdExecAsync(
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

			log(stdout)
			resolve(stdout)
		})
	})
}
