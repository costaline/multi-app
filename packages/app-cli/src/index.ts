#!/usr/bin/env ts-node
import { createRequire } from 'module'
import { Command } from 'commander'

import { cmd } from './helpers'

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

program.parse(process.argv)
