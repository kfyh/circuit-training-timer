const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

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
		publicPath: '/',
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: path.join(__dirname, 'output/'),
		port: 3000,
		publicPath: 'http://localhost:3000/',
		hot: true,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'html-template',
					to: '.',
					transform: (fileContent, path) => {
						const jsonPattern = /\.json$/gi;
						if (jsonPattern.test(path)) {
							return JSON.stringify(JSON.parse(fileContent.toString()));
						}
						return fileContent;
					},
				}
			]
		}),
		new HTMLWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html',
		}),
	],
};
