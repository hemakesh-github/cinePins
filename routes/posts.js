const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/cinePins")


const postSchema = mongoose.Schema({
    description: {
        type: String,
    },
    title: {
        type: String
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    image: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("Post", postSchema);