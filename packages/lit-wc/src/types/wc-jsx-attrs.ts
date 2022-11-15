type WithChildren<T, C = string> = T & { children?: C }
type WithoutSlot<T> = Omit<T, 'slot'>

export type WebComponentJsxAttributes<
	WC,
	A extends keyof WithoutSlot<WC>,
	R extends A | 'children' | null = null,
	C = any
> = R extends null
	? Partial<Pick<WithChildren<WithoutSlot<WC>, C>, A | 'children'>>
	: Partial<Pick<WithChildren<WithoutSlot<WC>, C>, Exclude<A, R>>> &
			Required<Pick<WithChildren<WithoutSlot<WC>, C>, Exclude<R, null>>>
