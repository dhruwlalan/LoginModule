module.exports = (app) => {
	//#Hook webpack-dev-middleware with hot reload#//
	if (process.env.FENV === 'development') {
		const webpack = require('webpack');
		const webpackDevMiddleware = require('webpack-dev-middleware');
		const webpackHotMiddleware = require('webpack-hot-middleware');
		const config = require('../../configs/webpack.start.js');
		const compiler = webpack(config);
		app.use(webpackDevMiddleware(compiler));
		app.use(webpackHotMiddleware(compiler));
	}
	//#Inject Bundles#//
	if (process.env.FENV === 'production') {
		const path = require('path');
		const fs = require('fs');
		let bundle = {};
		const publicDir = path.join(__dirname, '../../public');

		fs.readdir(publicDir , (err , files) => {
			if (err) return console.log('Unable to scan directory: ' + err);
			let assetsName = files.map((file) => file.split('.')[0]);
			files.forEach((_file , i) => {
				bundle = Object.defineProperty(bundle, assetsName[i] , {
					value: files[i] ,
					writable: true ,
				    enumerable: true ,
				});
			});
		});

		app.use((_req, res, next) => {
			res.locals.bundle = bundle
			next();
		});
	}
}
