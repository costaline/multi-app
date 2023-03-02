import chalk from 'chalk'

const base = (target: string) => {
	return (...message: any[]) => console.log(target, ...message)
}

const chalkLog = {
	success: base(chalk.bgGreenBright.black(' SUCCESS ')),
	info: base(chalk.bgBlueBright.black(' INFO ')),
	warning: base(chalk.bgYellowBright.black(' WARNING ')),
	error: base(chalk.bgRedBright.black(' ERROR ')),
}

export const log = Object.assign({}, console.log, chalkLog)
