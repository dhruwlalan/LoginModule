const path = require('path');
const express = require('express');
const hpp = require('hpp');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');


/*Create Express App*/
const app = express();

/*Setup Template Engine*/
app.set('view engine' , 'pug');
app.set('views' , path.join(__dirname , 'views'));

/*Serve Static Files*/
app.use( express.static(path.join(__dirname , 'public')) );

/*Use the BodyParser & CookieParser*/
app.use( express.json({ limit: '10kb' }) );
app.use( cookieParser() );

/*G-Zip Responses*/
app.use( compression() );

/* ** Setup Security Middlewares ** */
	// 1 trust x-forworded-for header attribute
	app.enable('trust proxy');
	// 2 enable cross-origin resource sharing
	app.use(cors());
	app.options('*' , cors());
	// 3 setup some security http headers
	app.use(helmet());
	app.use(helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
			baseUri: ["'self'"],
			fontSrc: ["'self'", 'https:', 'http:', 'data:'],
			scriptSrc: ["'self' 'unsafe-eval'", 'https:', 'http:', 'blob:'],
			styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:'],
		},
	}));
	// 4 data sanitization against nosql query injection & xss:
	app.use(mongoSanitize());
	app.use(xss());
	// 5 Limit requests from same api:
	app.use( '/api' , rateLimit({
		max: 100,
		windowMs: 60 * 60 * 1000,
		message: 'Too many requests from this IP, please try again in an hour!'
	}));
	// 6 Prevent parameter pollution:
	app.use(hpp({
		whitelist: [ 'name' , 'age' , ] ,
	}));

/*Define Routes*/
app.use( '/api/v1/users' , userRouter );
app.use( '/' , viewRouter );

/*Global Error Handler Middleware, executed when passed argument inside next()*/
app.use(errorController);

module.exports = app;