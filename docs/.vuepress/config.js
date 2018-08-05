module.exports = {
	title: 'whilter的个人博客',
	description: 'my personal blog',
	head: [
		['link', { rel: 'stylesheet', href: `/css/app.css` }],
		['link', { rel: 'stylesheet', href: `/css/iconfont.css` }]
	],
	themeConfig: {
		lastUpdated: true,
		sidebar: [
			{
				title: '首页',
				link: '/'
			},
			{
				title: '前端',
				collapsable: false,
				link: '/fontend/'
			},
			{
				title: 'Linux',
				collapsable: false,
				link: '/linux/'
			},
			{
				title: 'PHP',
				collapsable: false,
				link: '/php/'
			},
			{
				title: '杂记',
				link: '/diary/'
			}
		]
	},
	configureWebpack: {
		resolve: {
		  alias: {
			'@images': './public/images/'
		  }
		}
	}
}