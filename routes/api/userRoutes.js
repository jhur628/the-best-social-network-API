const router = require('express').Router();

const {
    createUser,
    getUsers
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

module.exports = router;