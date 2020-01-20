require('ignore-styles')

require('@babel/register')({
	ignore: [/(node_modules)/],
	presets: [
		[
			'@babel/preset-env',
			{
				targets: { node: 4 }
			}
		],
		'@babel/preset-react',
		[
			'@babel/preset-typescript',
			{
				allExtensions: true,
				isTSX: true
			}
		]
	],
	plugins: [
		'@babel/plugin-transform-runtime',
		'@babel/plugin-transform-typescript',
		[
			'module-resolver',
			{
				root: ['./../src'],
				alias: {
					store: './src/store',
					components: './src/components',
					containers: './src/containers',
					libs: './src/libs'
				}
			}
		]
	],
	extensions: ['.js', '.ts', '.tsx']
})

require('./server.tsx')
