declare module '*.css' {
	const styles: { [className: string]: string }
	export default styles
}

declare module '*.svg' {
	import type { FC, SVGProps } from 'react'

	const component: FC<SVGProps<SVGSVGElement>>

	export default component
}