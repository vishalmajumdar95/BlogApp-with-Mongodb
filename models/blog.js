const mongodb = require('mongoose');

// BlogSchema
const BlogSchema = new mongodb.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});


module.exports = mongodb.model("blogs", BlogSchema);