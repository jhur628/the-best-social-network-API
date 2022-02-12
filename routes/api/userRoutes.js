const router = require('express').Router();

const {
    createUser,
    getUsers,
    getUserById
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getUserById)

module.exports = router;