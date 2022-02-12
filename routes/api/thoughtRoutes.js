const router = require('express').Router();

const {
    addThought,
    getThoughts,
    getThoughtById,
    updateThoughtById,
    deleteThoughtById,
    addReaction
} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts)

router.route('/:userId').post(addThought)

router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById)

router.route('/:thoughtId/reactions').post(addReaction)

module.exports = router;