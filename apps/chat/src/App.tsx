import { Route, Routes } from '@solidjs/router'
import { lazy } from 'solid-js'

import type { Component } from 'solid-js'

const Main = lazy(async () => await import('./pages'))
const Room = lazy(async () => await import('./pages/room'))
const NotFound404 = lazy(async () => await import('./pages/404'))

const App: Component = () => {
	return (
		<Routes>
			<Route path="/room/:id" component={Room} />
			<Route path="/" component={Main} />
			<Route path="/*" component={NotFound404} />
		</Routes>
	)
}

export default App
