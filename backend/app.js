// IMPORTS // 
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require("helmet")
const path = require('path')
const apiLimiter = require("./middleware/limits-rate")
const userRoutes = require("./routes/user")
const postRoutes = require("./routes/post")
const commentRoutes = require("./routes/comment")

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(bodyParser.json({
  limit: "1kb"
}))
app.use(bodyParser.urlencoded({
  extended: true
})) // transform the req into an JS object 
app.use(helmet())
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
// all the routes

// exporting app
module.exports = app