const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: './src/index.ts',
	target: 'web',
	experiments: {
		outputModule: true,
	},
	output: {
		libraryTarget: 'module',
		path: path.resolve(__dirname, './build'),
		filename: 'kick-chat.js',
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		modules: [path.join(__dirname, 'src'), 'node_modules'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
			},
		],
	},
};
