const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

//#Setup Security Middlewares#//
module.exports = (app) => {
   //#1 trust x-forworded-for header attribute:#//
   app.enable('trust proxy');

   //#2 enable cross-origin resource sharing:#//
   app.use(cors());
   app.options('*', cors());

   //#3 setup some security http headers:#//
   app.use(helmet());
   app.use(
      helmet.contentSecurityPolicy({
         directives: {
            defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
            baseUri: ["'self'"],
            fontSrc: ["'self'", 'https:', 'http:', 'data:'],
            scriptSrc: ["'self' 'unsafe-eval'", 'https:', 'http:', 'blob:'],
            styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:'],
         },
      }),
   );

   //#4 data sanitization against nosql query injection & xss:#//
   app.use(mongoSanitize());
   app.use(xss());

   //#5 Limit requests from same api:#//
   app.use(
      '/api',
      rateLimit({
         max: 100,
         windowMs: 60 * 60 * 1000,
         message: 'Too many requests from this IP, please try again in an hour!',
      }),
   );

   //#6 Prevent parameter pollution:#//
   app.use(hpp({ whitelist: ['name', 'age'] }));
};
