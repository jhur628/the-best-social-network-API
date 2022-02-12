const router = require('express').Router();

const {
    addThought,
    getThoughts,
    getThoughtById,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    deleteReactionById
} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts)

router.route('/:userId').post(addThought)

router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById)

router.route('/:thoughtId/reactions').post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactionById)

module.exports = router;