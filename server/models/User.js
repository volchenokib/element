// Enter Database Schema
const mongoose = require('mongoose');
const keys = require('../keys');
mongoose
	.connect(keys.mongoURI, { useNewUrlParser: true }) // or 'mongodb://localhost:27017/dbname'

	.then(res => {
		console.log('res', res);
	})
	.catch(e => {
		console.log('error', e);
	});

const Schema = mongoose.Schema;
const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	check_in_date: {
		type: String,
		required: true
	},
	check_out_date: {
		type: String,
		required: true
	},
	role: {
		type: Number,
		required: true
	},
	status: {
		type: Number,
		required: true
	},
	distance_to_event: {
		type: Number,
		required: false
	},
	max_payment: {
		type: String,
		required: false
	},
	ready_to_share_accommodation: {
		type: Boolean,
		required: false
	},
	ready_to_share_room: {
		type: Boolean,
		required: false
	},
	plus_one: {
		type: Boolean,
		required: false
	}
});

module.exports = mongoose.model('user', userSchema);
