const router = require('express').Router();

const {
    addThought,
    getThoughts,
    getThoughtById
} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts)

router.route('/:userId').post(addThought)

router.route('/:thoughtId').get(getThoughtById)

module.exports = router;