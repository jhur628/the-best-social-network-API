const router = require('express').Router();

const {
    addThought
} = require('../../controllers/thoughtController')

router.route('/:userId').post(addThought)

module.exports = router;