import { createEffect, createSignal, on } from 'solid-js'

export const useStateWithCallback = (initialState) => {
	const [state, setState] = createSignal(initialState)

	let cbRef = null

	const updateState = (newState, cb) => {
		cbRef = cb

		setState((prev) =>
			typeof newState === 'function' ? newState(prev) : newState
		)
	}

	createEffect(
		on(
			state,
			(state) => {
				if (cbRef) {
					cbRef(state)
					cbRef = null
				}
			},
			{ defer: true }
		)
	)

	return [state, updateState]
}
