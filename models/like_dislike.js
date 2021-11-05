const mongodb = require('mongoose');

// LikeDislikeSchema
const LikeDislikeSchema = new mongodb.Schema({
    user_id: {
        type: String,
        required: true
    },
    like: {
        type: Boolean,
        required: true,
    },
    dislike: {
        type: Boolean,
        required: true
    }
});


module.exports = mongodb.model("LikeDislike", LikeDislikeSchema);