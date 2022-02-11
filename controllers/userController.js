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
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then(users => res.json(users))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // // Get user by id
    // getUserById(req, res) {
    //     User.findOne({ _id:req.params.userId })
    // }

}