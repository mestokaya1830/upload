const mongoose = require('mongoose')

const PostsSchema = new mongoose.Schema({
  title: {type:String, required: true},
  commenttext: {type:String, required: true},
  category: {type:String, required: true},
  author: {type:String, required: true},
  date: {type:Date, default: new Date()},
  mainimage: {type:String, required: true},
  comments: {type: Array}
})

module.exports = new mongoose.model('posts', PostsSchema)