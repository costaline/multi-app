export type MyCounterProps = Record<string, never>

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'my-counter': MyCounterProps
		}
	}
}
