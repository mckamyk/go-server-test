import * as webpack from 'webpack';
import * as wds from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';

interface Config extends webpack.Configuration{
  devServer:wds.Configuration
}

const config: Config = {
	entry: './src/index.ts',
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		port: 9000,
		https: true,
		compress: true,
		proxy: {
			'/api': 'http://localhost:8080',
		},
	},
	plugins: [new HtmlWebpackPlugin({template: './src/index.ejs'})],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
};

export default config;
