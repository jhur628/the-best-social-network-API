const router = require('express').Router();

const {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById)

module.exports = router;