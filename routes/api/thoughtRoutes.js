const router = require('express').Router();

const {
    addThought,
    getThoughts,
    getThoughtById,
    updateThoughtById
} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts)

router.route('/:userId').post(addThought)

router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById)

module.exports = router;