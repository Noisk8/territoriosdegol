// Config
// ------------
// Description: The configuration file for the website.

export interface Logo {
	src: string
	alt: string
}

export type Mode = 'auto' | 'light' | 'dark'

export interface Config {
	siteTitle: string
	siteDescription: string
	ogImage: string
	logo: Logo
	canonical: boolean
	noindex: boolean
	mode: Mode
	scrollAnimations: boolean
}

export const configData: Config = {
	siteTitle: 'Territorios De GOl',
	siteDescription:
		'Proyecto apoyado por el presupuesto poarticipativo de la ciudad de Medellín',
	ogImage: '/Pele.jpeg',
	logo: {
		src: '/Pele.jpeg',
		alt: 'Territorios De GOl'
	},
	canonical: true,
	noindex: false,
	mode: 'auto',
	scrollAnimations: true
}
