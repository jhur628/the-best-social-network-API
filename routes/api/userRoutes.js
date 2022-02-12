const router = require('express').Router();

const {
    createUser,
    getUsers,
    getUserById,
    updateUserById
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getUserById).put(updateUserById)

module.exports = router;