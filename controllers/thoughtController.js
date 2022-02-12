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
}
