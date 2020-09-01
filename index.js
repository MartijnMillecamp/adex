const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Import models
// require('./models/Product');


//Start express
const app = express();

//Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://admin:secret@picasso.experiments.cs.kuleuven.be:3006`);
const db = mongoose.connection;



app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`app running on port ${PORT}`)
});