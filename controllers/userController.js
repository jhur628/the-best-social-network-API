const { User, Thought } = require('../models');

module.exports = {
    // Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // GET all users
    getUsers(req, res) {
        User.find({})
        .select('-__v')
        .populate('thoughts')
        .populate('friends')
        .then(users => res.json(users))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Get user by id
    getUserById(req, res) {
        User.findOne({ _id:req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends')
        .then(async (user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID!' })
                : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    updateUserById(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
}