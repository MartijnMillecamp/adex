const mongoose = require('mongoose');
const Interaction = mongoose.model('interaction');

module.exports = (app) => {
	
	app.get(`/api/interaction`, async (req, res) => {
		let interactions = await Interaction.find();
		return res.status(200).send(interactions);
	});
	
	app.post(`/api/interaction`, async (req, res) => {
		let interaction = await Product.create(req.body);
		return res.status(201).send({
			error: false,
			interaction
		})
	})
	
	
	

	
}