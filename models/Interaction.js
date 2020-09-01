const mongoose = require('mongoose');
const {Schema} = mongoose;

const interactionSchema = new Schema({
	name: String,
	description: String,
});

mongoose.model('interaction', interactionSchema);