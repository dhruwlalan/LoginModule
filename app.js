const path = require('path');
const express = require('express');
const hpp = require('hpp');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

// setting the template engine:
app.set('view engine' , 'pug');
app.set('views' , path.join(__dirname , 'views'));
app.use( express.static(path.join(__dirname , 'public')) );

/* -- GLOBAL MIDDLEWARES -- */

// 1. Set security HTTP headers:
// app.use( helmet() );

// 2. Limit requests from same API:
const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP, please try again in an hour!'
});
app.use( '/api' , limiter );

// 3. Body parser, reading data from body into req.body:
app.use( express.json({ limit: '10kb' }) );
app.use( cookieParser() );

// 4. Data sanitization against NoSQL query injection:
app.use( mongoSanitize() );

// 5. Data sanitization against XSS:
app.use( xss() );

// 6. Prevent parameter pollution:
const whitelist = { whitelist: [
	'name' ,
	'age' ,
]};
app.use( hpp(whitelist) );

// 7. Compressing requests and responses:
app.use( compression() );

// 7. Define Routers:
app.use( '/api/v1/users' , userRouter );
app.use( '/' , viewRouter );

// 8. Handle undefined routes:
app.all( '*' , (req , res , next) => {
	next(new AppError(`Can't find the route ${req.originalUrl } on this server!` , 404));
});

// 9. Global error handler middleware, executed when passed argument with next:
app.use(errorController);

module.exports = app;