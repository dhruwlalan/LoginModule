const express = require('express');
const basic = require('./middlewares/basic');
const setSecurityHeaders = require('./middlewares/setSecurityHeaders');
const connectWebpack = require('./middlewares/connectWebpack');
const errorController = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

//#Create Express App#//
const app = express();

//#Setup Security Middlewares#//
setSecurityHeaders(app);

//#Hook webpack-dev-middleware with hot reload#//
connectWebpack(app);

//#Use Basic Middlewares#//
basic.setupTemplateEngin(app);
basic.serverStaticFiles(app);
basic.useParsers(app);
basic.gzipResponses(app);

//#Define Routes#//
app.use('/api/v1/users', userRouter);
app.use('/', viewRouter);

//#Global Error Handler Middleware, executed when passed argument inside next()#//
app.use(errorController);

module.exports = app;
