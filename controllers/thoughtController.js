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
    }
}
