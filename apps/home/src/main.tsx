import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lit-wc'
import 'svelte-wc'
import App from '@@/App'

import './index.css'
import 'global-css/style.css'

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<App />
	</StrictMode>
)
