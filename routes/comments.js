const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/cinePins")

const commentsSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    }
)

module.exports = module.exports = mongoose.model("Comment", commentsSchema);

