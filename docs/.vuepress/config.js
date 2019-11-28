module.exports = {
	title: 'whilter的个人博客',
	description: 'my personal blog',
	head: [
		
	],
	themeConfig: {
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
	// plugins: [
	// 	[
  //     'vuepress-plugin-container',
  //     {
  //       type: 'tip',
  //       defaultTitle: {
  //         '/': 'TIP',
  //         '/zh/': '提示',
  //       },
  //     },
  //   ],
	// ],
	configureWebpack: {
		resolve: {
		  alias: {
			'@images': './public/images/'
		  }
		}
	}
}