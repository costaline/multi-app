import freeice from 'freeice'
import { createEffect, onCleanup, onMount } from 'solid-js'

import { ACTIONS, socket } from '../socket'
import { useStateWithCallback } from './useStateWithCallback'

export const LOCAL_VIDEO = 'LOCAL_VIDEO'

export const useWebRTC = (roomID) => {
	const [clients, updateClients] = useStateWithCallback([])

	const addNewClient = (newClient, cb) => {
		if (!clients().includes(newClient)) {
			updateClients((list) => [...list, newClient], cb)
		}
	}

	const peerConnections = {}
	let localMediaStream = null
	const peerMediaElements = {
		[LOCAL_VIDEO]: null,
	}

	onMount(() => {
		async function handleNewPeer({ peerID, createOffer }) {
			if (peerID in peerConnections) {
				return console.warn(`Already connected to peer ${peerID}`)
			}

			peerConnections[peerID] = new RTCPeerConnection({
				iceServers: freeice(),
			})

			peerConnections[peerID].onicecandidate = (event) => {
				if (event.candidate) {
					socket.emit(ACTIONS.RELAY_ICE, {
						peerID,
						iceCandidate: event.candidate,
					})
				}
			}

			let tracksNumber = 0

			peerConnections[peerID].ontrack = ({ streams: [remoteStream] }) => {
				tracksNumber++

				// video & audio tracks received
				if (tracksNumber === 2) {
					addNewClient(peerID, () => {
						peerMediaElements[peerID].srcObject = remoteStream
					})
				}
			}

			localMediaStream.getTracks().forEach((track) => {
				peerConnections[peerID].addTrack(track, localMediaStream)
			})

			if (createOffer) {
				const offer = await peerConnections[peerID].createOffer()

				await peerConnections[peerID].setLocalDescription(offer)

				socket.emit(ACTIONS.RELAY_SDP, {
					peerID,
					sessionDescription: offer,
				})
			}
		}

		socket.on(ACTIONS.ADD_PEER, handleNewPeer)
	})

	onMount(() => {
		async function setRemoteMedia({ peerID, sessionDescription: remoteDescription }) {
			await peerConnections[peerID].setRemoteDescription(
				new RTCSessionDescription(remoteDescription)
			)

			if (remoteDescription.type === 'offer') {
				const answer = await peerConnections[peerID].createAnswer()

				await peerConnections[peerID].setLocalDescription(answer)

				socket.emit(ACTIONS.RELAY_SDP, {
					peerID,
					sessionDescription: answer,
				})
			}
		}

		socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia)
	})

	onMount(() => {
		socket.on(ACTIONS.ICE_CANDIDATE, ({ peerID, iceCandidate }) => {
			peerConnections[peerID].addIceCandidate(new RTCIceCandidate(iceCandidate))
		})
	})

	onMount(() => {
		function handleRemovePeer({ peerID }) {
			if (peerConnections[peerID]) {
				peerConnections[peerID].close()
			}

			delete peerConnections[peerID]
			delete peerMediaElements[peerID]

			updateClients((list) => list.filter((c) => c !== peerID))
		}
		socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer)
	})

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
