const { Thought, User } = require("../models");

const thoughtController = {
	async getAllThoughts(req, res) {
		try {
			const dbThoughtData = await Thought.find({}).select("-__v");
			res.json(dbThoughtData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	async getThoughtById({ params }, res) {
		try {
			const dbThoughtData = await Thought.findOne({
				_id: params.id,
			}).select("-__v");
			res.json(dbThoughtData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	async createThought({ params, body }, res) {
		try {
			const dbThoughtData = await Thought.create(body);
			await User.findOneAndUpdate(
				{ _id: params.userId },
				{ $push: { thoughts: dbThoughtData._id } },
				{ new: true }
			);

			res.json(dbThoughtData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	async updateThought({ params, body }, res) {
		try {
			const dbThoughtData = await Thought.findOneAndUpdate(
				{ _id: params.id },
				body,
				{ new: true, runValidators: true }
			);
			if (!dbThoughtData) {
				res.status(404).json({
					message: "No thought found with this id",
				});
				return;
			}
			res.json(dbThoughtData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	async deleteThought({ params }, res) {
		try {
			const dbThoughtData = await Thought.findOneAndDelete({
				_id: params.id,
			});
			res.json(dbThoughtData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	async createReaction({ params, body }, res) {
		try {
			const dbReactionData = await Thought.findOneAndUpdate(
				{ _id: params.thoughtId },
				{ $push: { reactions: body } },
				{ new: true, runValidators: true }
			);
			if (!dbThoughtData) {
				res.status(404).json({
					message:
						"No thought found with this id. Cannot attach a reaction.",
				});
				return;
			}
			res.json(dbReactionData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	async deleteReaction({ params, body }, res) {
		try {
			const dbReactionData = await Thought.findOneAndUpdate(
				{ _id: params.thoughtId },
				{ $pull: { reactions: { reactionId: params.reactionId } } },
				{
					new: true,
					runValidators: true,
				}
			);
			res.json(dbReactionData);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},
};

module.exports = thoughtController;
