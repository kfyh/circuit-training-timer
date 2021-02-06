module.exports = {
	presets: [
		'@babel/preset-react',
		'@babel/preset-typescript',
		[
			'@babel/preset-env',
			{
				modules: false,
				targets: '> 0.25%, not dead',
			},
		],
	],
	plugins: ['@babel/proposal-class-properties', '@babel/proposal-object-rest-spread', ['@babel/plugin-transform-runtime', { corejs: 3 }]],
};
