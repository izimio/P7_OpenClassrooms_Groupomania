
// IMPORTS // 
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require("helmet")
const apiLimiter = require("./middleware/limits-rate")
const path = require('path')
const app = express() 
const userRoutes = require("./routes/user");


app.use((req, res, next) => { 
  res.setHeader('Access-Control-Allow-Origin', '*') 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization') 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(bodyParser.json({ limit: "1kb" }))
app.use(helmet()) 
app.use('/images', express.static(path.join(__dirname, 'images'))); 

app.use(express.json())

app.use('/api/users', userRoutes);
// all the routes


// exporting app
module.exports = app