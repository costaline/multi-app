import { useParams } from '@solidjs/router'
import { For } from 'solid-js'

import { LOCAL_VIDEO, useWebRTC } from '../hooks/useWebRTC'

const Room = () => {
	const { id: roomID } = useParams()

	const { clients, provideMediaRef } = useWebRTC(roomID)

	return (
		<div>
			<For each={clients()}>
				{(clientID) => {
					return (
						<div>
							<video
								ref={(instance) => {
									provideMediaRef(clientID, instance)
								}}
								autoPlay
								playsInline
								muted={clientID === LOCAL_VIDEO}
							/>
						</div>
					)
				}}
			</For>
		</div>
	)
}

export default Room
