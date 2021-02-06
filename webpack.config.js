const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = !!(process.env.NODE_ENV === 'production');

module.exports = {
	entry: './src/index.tsx',
	mode: process.env.NODE_ENV,
	devtool: isProduction ? false : 'source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				options: { presets: ['@babel/env'] },
			},
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	resolve: { extensions: ['*', '.js', '.jsx', '.ts', '.tsx'] },
	output: {
		path: path.resolve(__dirname, 'output/'),
		publicPath: '/output/',
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: path.join(__dirname, 'public/'),
		port: 3000,
		publicPath: 'http://localhost:3000/output/',
		hot: true,
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin()
	],
};
