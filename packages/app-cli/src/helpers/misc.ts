export function getEnvDateTitle(length: number = 80): string {
	const date = ` ${new Date().toUTCString()} `
	const right = Math.floor((length - date.length) / 2)
	const dateTitle = date.padStart(length - right, '#').padEnd(length, '#')

	return dateTitle
}
