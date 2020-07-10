const mongoose = require('mongoose');

const uri = 'mongodb+srv://dbUser:dbUser@cluster0.m06tc.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;