// Define your routes
import express from 'express';
import path from 'path';
import User from '../models/User';
const router = express.Router();

// http://localhost:9000/api/user
// create
router.post('/', async (req, res) => {
	const userData = {
		name: req.body.name,
		gender: req.body.gender,
		phone: req.body.phone,
		email: req.body.email,
		check_in_date: req.body.check_in_date,
		check_out_date: req.body.check_out_date,
		role: req.body.role,
		status: req.body.status,
		distance_to_event: req.body.distance_to_event,
		max_payment: req.body.max_payment,
		ready_to_share_accommodation: req.body.ready_to_share_accommodation,
		ready_to_share_room: req.body.ready_to_share_room,
		plus_one: req.body.plus_one
	};
	const user = new User(userData);
	await user.save();
	const users = await User.find({});
	res.status(201).json(users);
});

// read
router.get('/', async (req, res) => {
	const user = await User.find({});
	res.status(200).json(user);
});

// update
router.put('/:id', async (req, res) => {
	await User.findByIdAndUpdate({ id: req.params._id });
	const users = await User.find({});
	res.status(200).json(users);
});

// delete
router.delete('/:_id', async (req, res) => {
	await User.remove({ _id: req.params._id });
	const users = await User.find({});
	res.status(200).json(users);
});

module.exports = router;
