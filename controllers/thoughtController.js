const { Thought, User } = require('../models');

module.exports = {
    // POST a thought
    addThought(req, res) {
        Thought.create(req.body)
        .then((thought) =>
            User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { thoughts: thought } },
                { runValidators: true, new: true }
            )
        )
        .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'User not found!' })
                    : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // GET all thoughts
    getThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .populate('reactions')
        .then((thoughts) => res.json(thoughts))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // GET thought by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .populate('reactions')
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought by that id!' })
                : res.json(thought)
        )
        .catch((err) =>{
            console.log(err);
            return res.status(500).json(err);
        });
    },
    // PUT thought by id
    updateThoughtById(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought by that id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE thought by id
    deleteThoughtById(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought by that id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // POST a reaction by thoughtId
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought by that id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE a reaction by id
    deleteReactionById(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } }},
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought by that id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
}
