import { useState } from 'react'
// import {MyElement} from 'wc'

import './App.css'
import reactLogo from './assets/react.svg'

function App() {
	const [count, setCount] = useState(0)



	return (
		<div className="App">
			<button>click</button>
			<div>
				<a href="https://vitejs.dev" rel="noreferrer" target="_blank">
					{' '}
					<img alt="Vite logo" className="logo" src="/vite.svg" />
				</a>
				<a href="https://reactjs.org" rel="noreferrer" target="_blank">
					<img alt="React logo" className="logo react" src={reactLogo} />
				</a>
			</div>

			{/*<my-element docsHint={`hello from counter: ${count}`}></my-element>*/}
			<demo-element name="REACT">Some text</demo-element>

			<global-nav/>

			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</div>
	)
}

export default App
