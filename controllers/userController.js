const { User } = require('../models');

module.exports = {
    // POST a user
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
    // GET user by id
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
    // PUT user data by id
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
    },
    // DELETE user and thoughts connected to user by id
    deleteUserById(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with that id!' })
                    : User.deleteMany({ _id: { $in: user.thoughts }})
            )
            .then(() => res.json({ message: 'User and thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // POST new friend to user
    addFriendToUser(req, res) {
        console.log('Adding friend');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that id!'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE friend by user id
    removeFriendFromUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that id!' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
}