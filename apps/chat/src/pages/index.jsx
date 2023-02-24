import { useNavigate } from '@solidjs/router'
import { createSignal, For, onMount } from 'solid-js'
import { v4 as uuid } from 'uuid'

import { ACTIONS, socket } from '../socket'

const Main = () => {
	const navigate = useNavigate()
	const [rooms, updateRooms] = createSignal([])
	let rootNode = null

	onMount(() => {
		socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
			if (rootNode) {
				updateRooms(rooms)
			}
		})
	})

	return (
		<div ref={(el) => (rootNode = el)}>
			<h1>Available Rooms</h1>

			<ul>
				<For each={rooms()}>
					{(roomID) => (
						<li>
							{roomID}
							<button
								onClick={() => {
									navigate(`/room/${roomID}`)
								}}
							>
								JOIN ROOM
							</button>
						</li>
					)}
				</For>
			</ul>

			<button
				onClick={() => {
					navigate(`/room/${uuid()}`)
				}}
			>
				Create New Room
			</button>
		</div>
	)
}

export default Main
