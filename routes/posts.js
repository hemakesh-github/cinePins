const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://hemakesh8333:hCVGLUEJJL3ERzAt@cluster0.pmaz9mg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/cinePins",  { useNewUrlParser: true, connectTimeoutMS: 30000 })


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