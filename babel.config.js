module.exports = {
	presets: ['@babel/preset-react', '@babel/preset-typescript', '@babel/preset-env'],
	plugins: ['@babel/proposal-class-properties', '@babel/proposal-object-rest-spread', ['@babel/plugin-transform-runtime', { corejs: 3 }]],
};
