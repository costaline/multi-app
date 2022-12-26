#!/usr/bin/env ts-node
import { createRequire } from 'module'
import { Command } from 'commander'

import * as commands from './commands'

const require = createRequire(import.meta.url)
const { version } = require('../package.json')

const program = new Command()

program
	.name('app-cli')
	.description('cli to simplify work with this project')
	.version(version)

Object.entries(commands).forEach(([_, makeCommand]) => {
	program.addCommand(makeCommand())
})

program.parse(process.argv)
