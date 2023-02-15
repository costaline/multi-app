import http from 'node:http'

import express from 'express'

const app = express()
const server = http.createServer(app)

// TODO: add env
const PORT = 9999

app.get('/', (req, res) => {
	res.send('<h1>Server</h1>')
})

server.listen(PORT, () => {
	console.log(`server has been started on port ${PORT}`)
})
