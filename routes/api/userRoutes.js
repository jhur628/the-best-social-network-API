const router = require('express').Router();

const {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    addFriendToUser
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById)

router.route('/:userId/friends/:friendId').post(addFriendToUser)

module.exports = router;