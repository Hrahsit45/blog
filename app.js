//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

var _ = require('lodash');
const mongoose = require('mongoose');
// Load the core build.


mongoose.connect("mongodb://localhost:27017/blogdb", {useNewUrlParser:true , useUnifiedTopology: true});

const blogschema = mongoose.Schema({
  name : String,
  content : String
})

const blog = mongoose.model("blog",blogschema);

const one = new blog ({
  name : 'first title',
  content : 'this is the first shot check'
})

// one.save();



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];
 
let postpagetitle ;
 
let postpagetext ;



app.get("/", (req, res) => {

 
  blog.find({},function(err , foundlist ){
    if(err)
    console.log(err);
    else{
      res.render("home" ,{Home : homeStartingContent , postt : foundlist });
    console.log(foundlist);
    }
  })
  
});

app.get("/about", (req,res)=>{

    res.render("about",{about : aboutContent});
});

app.get("/contact",(req, res)=>{

    res.render("contact",{contact : contactContent});
})

app.get("/compose",(req, res)=>{

  res.render("compose");
})


app.post("/compose",(req,res)=>{

const newpost = new blog ({
  name : req.body.posttitle,
  content : req.body.postbody
})

newpost.save();
  // console.log(posts);

  res.redirect("/");


})

// app.get("/posts/:postName/idname/:id-:date",function(req,res){



app.get("/posts/:postName",function(req,res){

  var requiredTitle = _.lowerCase(req.params.postName);

  blog.findOne({name: requiredTitle },function(err, foundcontent){

    if(err)
    console.log("not found");
    else
    {
      res.render("post",{pagecontent : foundcontent})
    }

  })

  // posts.forEach(function(post){
  //   var storedTitle = _.lowerCase(post.title);

  //   if( requiredTitle === storedTitle )
  //   {
  //     console.log("match found")

  //     postpagetitle = post.title;
  //      postpagetext = post.text;

  //      res.render("post",{ pagetitle : postpagetitle ,
  //        pagetext : postpagetext})

  //   }
  //   else
  //   {
  //     console.log("not found");
  //   }
  // })
})









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
