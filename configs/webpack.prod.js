const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'production' ,
	entry: { 
		signup: path.resolve(__dirname, '../src/js/signup.js') ,
		login: path.resolve(__dirname, '../src/js/login.js') ,
		home: path.resolve(__dirname, '../src/js/home.js') ,
		forgetPassword: path.resolve(__dirname, '../src/js/forgetPassword.js') ,
		resetPassword: path.resolve(__dirname, '../src/js/resetPassword.js') ,
		edit: path.resolve(__dirname, '../src/js/edit.js') ,
	} ,
	output: {
		filename: '[name].[contentHash].bundle.js' ,
		path: path.resolve(__dirname, '../public') ,
	} ,
	module: {
		rules: [
			{
				test: /\.html$/ ,
				use: ['html-loader'] ,
			} ,
			{
				test: /\.css$/ ,
				use: [
					MiniCssExtractPlugin.loader ,
					{ loader: 'css-loader' , options: { url: false } } ,
				] ,
			} ,
			{
				test: /\.scss$/ ,
				use: [
					MiniCssExtractPlugin.loader ,
					{ loader: 'css-loader' , options: { url: false } } ,
					'sass-loader' ,
				] ,
			} ,
			{
				test: /\.js$/ ,
				exclude: /node_modules/ ,
				use: ['babel-loader'] ,
			} ,
			{
				test: /\.ico$/ ,
				use: {
					loader: 'file-loader' ,
					options: { name: 'favicon.ico' , outputPath: 'assets/favicon' } ,
				} ,
			} ,
			{
				test: /\.svg$/ ,
				use: {
					loader: 'file-loader' ,
					options: { name: '[name].[ext]' , esModule: false , outputPath: 'assets/svg' } ,
				} ,
			} ,
			{
				test: /\.(jpeg|png|jpg|gif)$/ ,
				use: {
					loader: 'file-loader' ,
					options: { name: '[name].[ext]' , esModule: false , outputPath: 'assets/images' } ,
				} ,
			} ,
			{
				test: /\.(ttf|woff|woff2)$/ ,
				use: {
					loader: 'file-loader' ,
					options: { name: '[name].[ext]' , esModule: false , outputPath: 'assets/fonts' } ,
				} ,
			} ,
		] ,
	} ,
	plugins: [
		new MiniCssExtractPlugin({ filename: 'style.[contentHash].css' }) ,
		new CleanWebpackPlugin() ,
	] ,
	optimization: {
		minimizer: [ new OptimizeCssAssetsPlugin() , new TerserPlugin() ] ,
		splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/ ,
                    name: 'vendor' ,
                    chunks: 'all' ,
                    enforce: true ,
                }
            }
        }
	} ,
};