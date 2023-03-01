import http from 'node:http'

import express from 'express'
import { Server } from 'socket.io'
import { validate, version } from 'uuid'

import { SOCKET_ACTIONS } from './socket-actions.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

// TODO: add env
const PORT = process.env.PORT || 4002

function getClientRooms() {
	const { rooms } = io.sockets.adapter

	return Array.from(rooms.keys()).filter(
		(roomID) => validate(roomID) && version(roomID) === 4
	)
}

function shareRoomsInfo() {
	io.emit(SOCKET_ACTIONS.SHARE_ROOMS, {
		rooms: getClientRooms(),
	})
}

io.on('connection', (socket) => {
	shareRoomsInfo()

	socket.on(SOCKET_ACTIONS.JOIN, (config) => {
		console.log('jjjoin')
		const { room: roomID } = config
		const { rooms: joinedRooms } = socket

		if (Array.from(joinedRooms).includes(roomID)) {
			return console.warn(`Already joined to ${roomID}`)
		}

		const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || [])

		clients.forEach((clientID) => {
			io.to(clientID).emit(SOCKET_ACTIONS.ADD_PEER, {
				peerID: socket.id,
				createOffer: false,
			})

			socket.emit(SOCKET_ACTIONS.ADD_PEER, {
				peerID: clientID,
				createOffer: true,
			})
		})

		socket.join(roomID)
		shareRoomsInfo()
	})

	function leaveRoom() {
		const { rooms } = socket

		Array.from(rooms)
			// LEAVE ONLY CLIENT CREATED ROOM
			.filter((roomID) => validate(roomID) && version(roomID) === 4)
			.forEach((roomID) => {
				const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || [])

				clients.forEach((clientID) => {
					io.to(clientID).emit(SOCKET_ACTIONS.REMOVE_PEER, {
						peerID: socket.id,
					})

					socket.emit(SOCKET_ACTIONS.REMOVE_PEER, {
						peerID: clientID,
					})
				})

				socket.leave(roomID)
			})

		shareRoomsInfo()
	}

	socket.on(SOCKET_ACTIONS.LEAVE, leaveRoom)
	socket.on('disconnecting', leaveRoom)

	socket.on(SOCKET_ACTIONS.RELAY_SDP, ({ peerID, sessionDescription }) => {
		io.to(peerID).emit(SOCKET_ACTIONS.SESSION_DESCRIPTION, {
			peerID: socket.id,
			sessionDescription,
		})
	})

	socket.on(SOCKET_ACTIONS.RELAY_ICE, ({ peerID, iceCandidate }) => {
		io.to(peerID).emit(SOCKET_ACTIONS.ICE_CANDIDATE, {
			peerID: socket.id,
			iceCandidate,
		})
	})
})

app.get('/', (req, res) => {
	res.send('<h1>Server</h1>')
})

server.listen(PORT, () => {
	console.log(`server has been started on port ${PORT}`)
})
