const router = require('express').Router();

const {
    addThought,
    getThoughts
} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts)

router.route('/:userId').post(addThought)

module.exports = router;