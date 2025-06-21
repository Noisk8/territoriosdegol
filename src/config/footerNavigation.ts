// Footer Navigation
// ------------
// Description: The footer navigation data for the website.
export interface Logo {
	src: string
	alt: string
	text: string
}

export interface FooterAbout {
	title: string
	aboutText: string
	logo: Logo
}

export interface SubCategory {
	subCategory: string
	subCategoryLink: string
}

export interface FooterColumn {
	category: string
	subCategories: SubCategory[]
}

export interface SubFooter {
	copywriteText: string
}

export interface FooterData {
	footerAbout: FooterAbout
	footerColumns: FooterColumn[]
	subFooter: SubFooter
}

export const footerNavigationData: FooterData = {
	footerAbout: {
		title: 'Territorios de GOL.',
		aboutText:
			'Proyecto apoyado por el presupuesto poarticipativo de la ciudad de Medellín',
		logo: {
			src: '/741.jpg',
			alt: 'Territorios de GOL.',
			text: 'Territorios de GOL.'
		}
	},
	footerColumns: [
		// {
		// 	category: 'Product',
		// 	subCategories: [
		// 		{
		// 			subCategory: 'Features',
		// 			subCategoryLink: '/features'
		// 		},
			
		// 		{
		// 			subCategory: 'Terms',
		// 			subCategoryLink: '/terms'
		// 		}
		// 	]
		// },
		// {
		// 	category: 'About us',
		// 	subCategories: [
		// 		{
		// 			subCategory: 'About us',
		// 			subCategoryLink: '/'
		// 		},
		// 		{
		// 			subCategory: 'News',
		// 			subCategoryLink: '/blog'
		// 		},
		// 		{
		// 			subCategory: 'Careers',
		// 			subCategoryLink: '/blog'
		// 		}
		// 	]
		// },
		// {
		// 	category: 'Get in touch',
		// 	subCategories: [
		// 		{
		// 			subCategory: 'Contact',
		// 			subCategoryLink: '/contact'
		// 		},
		// 		{
		// 			subCategory: 'Support',
		// 			subCategoryLink: '/contact'
		// 		},
		// 		{
		// 			subCategory: 'Join us',
		// 			subCategoryLink: '/contact'
		// 		}
		// 	]
		// }
	],
	subFooter: {
		copywriteText: 'Territorios de GOL.'
	}
}
