import { createEffect, onCleanup } from 'solid-js'

import { ACTIONS, socket } from '../socket'
import { useStateWithCallback } from './useStateWithCallback'

const LOCAL_VIDEO = 'LOCAL_VIDEO'

export const useWebRTC = (roomID) => {
	const [clients, updateClients] = useStateWithCallback([])

	const addNewClient = (newClient, cb) => {
		if (!clients().includes(newClient)) {
			updateClients((list) => [...list, newClient], cb)
		}
	}

	// const peerConnections = {}
	let localMediaStream = null
	const peerMediaElements = {
		[LOCAL_VIDEO]: null,
	}

	createEffect(() => {
		async function startCapture() {
			localMediaStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			})

			addNewClient(LOCAL_VIDEO, () => {
				const localVideoElement = peerMediaElements[LOCAL_VIDEO]

				if (localVideoElement) {
					localVideoElement.volume = 0
					localVideoElement.srcObject = localMediaStream
				}
			})
		}

		startCapture()
			.then(() => socket.emit(ACTIONS.JOIN, { room: roomID }))
			.catch((e) => console.error('Error getting userMedia:', e))

		onCleanup(() => {
			localMediaStream.getTracks().forEach((track) => track.stop())

			socket.emit(ACTIONS.LEAVE)
		})
	})

	const provideMediaRef = (id, node) => {
		peerMediaElements[id] = node
	}

	return { clients, provideMediaRef }
}
