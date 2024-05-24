var express = require('express');
var router = express.Router();
const passport = require("passport");
const users = require("./users");
const posts = require("./posts");
const comments = require("./comments");
const localStrategy = require("passport-local");
const upload = require("./multer");
const bodyParser=require("body-parser")
const bcrypt = require("bcrypt")

passport.use(new localStrategy(
  users.authenticate()));

/* GET home page. */
router.get("/", async function(req, res, next){
  const Allposts = await posts.find();
  console.log(req.isAuthenticated)
  let userDp = req.isAuthenticated() ? req.session.user.dp : "";
  res.render("index", { posts: Allposts, loggedIn: req.isAuthenticated(), userDP: userDp})
})
router.use(express.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/login', function(req, res, next) {
  // console.log(req.flash("error"))
  res.render('login', {error: req.flash("error"), loggedIn: false});
});



router.get("/register", function(req, res, next){
  res.render("register", {loggedIn: false});
})

router.post("/register", async function(req, res, next){
  const {username, email, fullname } = req.body;
  const userData = new users({
    username,
    email,
    fullname
  })
  users.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/login");
    })
  })
})


router.post("/login", passport.authenticate("local",{
  failureRedirect: "/login",
  failureFlash: true
}), function(req, res){
  const user = req.user;
  req.session.user = user;
  res.redirect("/profile");
});


router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      }
    });
    res.redirect('/');
  });
});

router.get("/profile", isLoggedIn, async function(req, res, next){
  const user = await users.findOne({
    username: req.session.passport.user
  }).populate("posts")
  console.log("hello")
  res.render("profile", {username: user.username, email: user.email, fullname: user.fullname, posts: user.posts,userDP: user.dp, loggedIn: true});
})

router.post("/upload",isLoggedIn, upload.single("image"), async (req, res)=>{
  if (!req.file){
    res.status(400).send("No files uploaded")
  }
  const user = await users.findOne({
    username: req.session.passport.user
  })
  const post = await posts.create({
    description: req.body.description,
    user: user._id,
    image: req.file.filename,
    title: req.body.title
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect("profile");
})

router.get("/upload", function(req, res){
  res.render("upload", {loggedIn: req.isAuthenticated(), userDP: req.session.user.dp});
})

router.get("/post/:post_id", async function(req, res){
  const id = req.params["post_id"];
  console.log(id)
  let jsonRes = {}
  jsonRes['userId'] = ""
  if (req.isAuthenticated()) {
    let user = req.session.user;
    jsonRes["userId"] = user._id;
    jsonRes['userDP'] = user.dp;
  }
  jsonRes["loggedIn"] = req.isAuthenticated();
  
  const post = await posts.findOne({
    _id: id
  }).populate({
    path: 'comments',
    populate: {
      path: 'user',
      model: 'User'
    }
  });
  jsonRes['post'] = post
  console.log(jsonRes)
  res.render("post", jsonRes)
})


router.post("/addComment",async function(req, res){
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  let user = await users.findOne({
    username: req.session.passport.user
  })
  let comment = await comments.create(
    {
      comment: req.body.comment,
      user: user._id,
      post: req.body.postId
    }
  )
  let post = await posts.findOne({
    _id: req.body.postId
  })
  post.comments.push(comment._id)
  await post.save();
  console.log(comment);
  res.status(200).send("Comment sent")
})



//Code for liking the post
router.post("/likePost", async function(req, res){
  if(!req.isAuthenticated()){
    res.status(401).json({
      message: "Login to like."
    })
    return
  }
  let user = await users.findOne({
    username: req.session.passport.user
  });
  let post = await posts.findOne({
    _id: req.body.postId
  })
  post.likes.push(user._id);
  await post.save();
  res.json({
    likes: post.likes.length
  });
})



//Code for liking a comment 
router.post("/likeComment", async function(req, res){
  if(!req.isAuthenticated()){
    res.status(401).json({
      message: "Login to like."
    })
    return
  }
  let user = await users.findOne({
    username: req.session.passport.user
  });
  let comment = await comments.findOne({
    _id: req.body.commentId
  });
  console.log(comment)
  comment.likes.push(user._id);
  await comment.save();
  console.log(comment)
  res.json({
    likes: comment.likes.length
  });
})

router.post("/dislikeComment", async function(req, res){
  if (!req.isAuthenticated()){
    res.status(401).send("Login");
    return
  }
  let user = await users.findOne({
    username: req.session.passport.user
  });
  let commentId = req.body.commentId;
  let comment = await comments.findOne({
    _id: commentId
  })
  comment.likes.pull(user._id);
  await comment.save();
  res.status(200).json(comment)
})

router.post("/dislikePost", async function(req, res){
  if (!req.isAuthenticated()){
    res.status(401).send("Login");
    return
  }
  let user = await users.findOne({
    username: req.session.passport.user
  });
  let postId = req.body.postId;
  let post = await posts.findOne({
    _id: postId
  })
  post.likes.pull(user._id);
  await post.save();
  res.status(200).json(post);
})





function isLoggedIn(req, res, next){

  if(req.isAuthenticated()){
    
    return next();
  }
  console.log("not logged in")
  res.status(401).redirect("/login")
}



module.exports = router;
