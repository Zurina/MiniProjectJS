var mongoose = require('mongoose');

function connect(dbUriString){
 // This returns a promise
 console.log("Connecting to: " + dbUriString)
 return mongoose.connect(dbUriString,{ useNewUrlParser: true, useCreateIndex: true }); 
}

mongoose.connection.once('connected', function () { 
 console.log('Connection occured');
});

mongoose.connection.once('error',function (err) { 
 console.log('Mongoose default connection error: ' + err);
});

module.exports = connect;
