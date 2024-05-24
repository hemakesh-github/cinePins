const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://hemakesh8333:hCVGLUEJJL3ERzAt@cluster0.pmaz9mg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/cinePins",  { useNewUrlParser: true, connectTimeoutMS: 30000 })

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

