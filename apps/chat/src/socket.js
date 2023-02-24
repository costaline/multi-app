import { io } from 'socket.io-client'

export const socket = io('http://localhost:9999', {
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
