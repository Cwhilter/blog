module.exports = {
	title: 'whilter的个人博客',
	description: 'my personal blog',
	head: [
		['link', { rel: 'stylesheet', href: `/css/iconfont.css` }]
	],
	themeConfig: {
		sidebar: [
			{
				title: '全部',
				link: '/'
			},
			{
				title: '前端',
				link: '/fontend/'
			},
			{
				title: 'Linux',
				link: '/linux/'
			},
			{
				title: '其他',
				link: '/diary/'
			}
		]
	},
	plugins: [
	],
	configureWebpack: {
		resolve: {
		  alias: {
			'@images': './public/images/'
		  }
		}
	}
}