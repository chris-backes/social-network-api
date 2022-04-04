const { User } = require("../models");

const userController = {
	async getAllUsers(req, res) {
		try {
			const dbUserData = await User.find({})
				.populate({ path: "thoughts", select: "-__v" })
				.populate({ path: "friends", select: "-__v" })
				.select("-__v");
			res.json(dbUserData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},
	async getUserbyId({ params }, res) {
		try {
			const dbUserData = await User.findOne({ _id: params.id })
				.populate({ path: "thoughts", select: "-__v" })
				.populate({ path: "friends", select: "-__v" })
				.select("-__v");
			res.json(dbUserData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	async createUser({ body }, res) {
		try {
			const dbUserData = await User.create(body);
			res.json(dbUserData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	async updateUser({ params, body }, res) {
		try {
			const dbUserData = await User.findOneAndUpdate(
				{ _id: params.id },
				body,
				{
					new: true,
					runValidators: true,
				}
			);
			if (!dbUserData) {
				res.status(404).json({
					message: "No User found with this id",
				});
				return;
			}
			res.json(dbUserData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	async deleteUser({ params, body }, res) {
		try {
			const dbUserData = await User.findOneAndDelete({ _id: params.id });
			res.json(dbUserData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	async addFriend({ params }, res) {
		try {
			const dbFriendData = await User.findOneAndUpdate(
				{ _id: params.id },
				{ $push: { friends: params.friendId } },
				{ new: true }
			)
				.populate({ path: "friends", select: "-__v" })
				.select("-__v");
			res.json(dbFriendData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	async deleteFriend({ params }, res) {
		try {
			const dbFriendData = await User.findOneAndUpdate(
				{ _id: params.id },
				{ $pull: { friends: params.friendId } },
				{ new: true }
			)
				.populate({ path: "friends", select: "-__v" })
				.select("-__v");
			res.json(dbFriendData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},
};

module.exports = userController;
