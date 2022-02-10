const { Schema, model } = require('mongoose');
const { reactionSchema } = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => date.toLocaleDateString()
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);