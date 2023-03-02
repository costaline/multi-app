import { io } from 'socket.io-client'

const uri = import.meta.env.VITE_SOCKET_URI || 'http://localhost:4002'

export const socket = io(uri, {
	forceNew: true,
	reconnectionAttempts: Infinity,
	timeout: 10_000,
	transports: ['websocket'],
})

export const ACTIONS = {
	JOIN: 'join',
	LEAVE: 'leave',
	SHARE_ROOMS: 'share-rooms',
	ADD_PEER: 'add-peer',
	REMOVE_PEER: 'remove-peer',
	RELAY_SDP: 'relay-sdp',
	RELAY_ICE: 'relay-ice',
	ICE_CANDIDATE: 'ice-candidate',
	SESSION_DESCRIPTION: 'session-description',
}
