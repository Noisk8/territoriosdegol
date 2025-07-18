// Navigation Bar
// ------------
// Description: The navigation bar data for the website.
export interface Logo {
	src: string
	alt: string
	text: string
}

export interface NavSubItem {
	name: string
	link: string
}

export interface NavItem {
	name: string
	link: string
	submenu?: NavSubItem[]
}

// export interface NavAction {
// 	name: string
// 	link: string
// 	style: string
// 	size: string
// }

export interface NavData {
	logo: Logo
	navItems: NavItem[]
	// navActions: NavAction[]
}

export const navigationBarData: NavData = {
	logo: {
		src: '/741.jpg',
		alt: 'The tailwind astro theme',
		text: 'Territorios de GOL'
	},
	navItems: [
		{ name: 'Home', link: '/' },
		{ name: 'Historias', link: '/historias' },
		{ name: 'Libro', link: '/libro' },
		// { name: 'Features', link: '/features' },
		// {
		// 	name: 'Resources',
		// 	link: '#',
		// 	submenu: [
		// 		{ name: '', link: '/blog' },
		// 		{ name: 'Changelog', link: '/changelog' },
		// 		{ name: 'FAQ', link: '/faq' },
		// 		{ name: 'Terms', link: '/terms' }
		// 	]
		// },
		{ name: 'Contacto', link: '/contact' }
	],
	// navActions: [{ name: 'Historias', link: '/historias', style: 'primary', size: 'lg' }]
}
