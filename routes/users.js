const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")
mongoose.connect("mongodb+srv://hemakesh8333:hCVGLUEJJL3ERzAt@cluster0.pmaz9mg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/cinePins")

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  email: {
    type: String,
    required: true,
    unique: true,
  }, 
  fullname: {
    type: String,
    required: true
  },
  dp: {
    type: String,
    default: "dp.jpeg"
  }
});
userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema);