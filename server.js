require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app.js');


/* global handler for unhandeled errors */
process.on('unhandledRejection' , (err) => {
	console.log(err);
	console.log('Unhandled Rejection! Shutting Down...');
	server.close(() => {
		process.exit(1);
	});
});
process.on('uncaughtException' , (err) => {
	console.log(err);
	console.log('Uncaught Exception! Shutting Down...');
	server.close(() => {
		process.exit(1);
	});
});


/* connect mongodb */
// 1. build the database string:
const DB = process.env.MDB_ATLAS.replace('<PASS>' , process.env.MDB_PASS);
// 2. connect to the database:
mongoose.connect(DB , {
	useNewUrlParser: true ,
	useCreateIndex: true ,
	useFindAndModify: false ,
	useUnifiedTopology: true ,
})
.then(() => { console.log('DB Connection Successful!') })
.catch((err) => { 
	console.log('DB Connection Unsuccessful!');
	console.log('error:' , err.message);
});


/* start server */
port = process.env.PORT || 8000;
const server = app.listen(port);