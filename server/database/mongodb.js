const mongoose = require('mongoose');

module.exports = {
	connect: () => {
		mongoose.connect(process.env.MDB_ATLAS , {
         // Determines whether or not to use the new url parser.
         // Enables the new, spec-compliant url parser shipped in the core driver.
         // This url parser fixes a number of problems with the original parser,
         // and aims to outright replace that parser in the near future.
			useNewUrlParser: true ,

         // False by default. If true, this connection will use createIndex()
         // instead of ensureIndex() for automatic index builds via Model.init().
			useCreateIndex: true ,

         // False by default. If true, this connection will use createIndex() instead
         // of ensureIndex() for automatic index builds via Model.init().
			useFindAndModify: false ,

         // Enables the new unified topology layer
			useUnifiedTopology: true ,
		}).then(() => { console.log('DB Connection Successful!') })
		.catch((e) => { console.log('DB Connection Unsuccessful! Error: ' , e.message) });
	}
}
