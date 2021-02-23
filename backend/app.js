
// IMPORTS // 
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require("helmet")
const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')
const apiLimiter = require("./middleware/limits-rate")
const path = require('path')

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.khuui.mongodb.net/${process.env.DB_CLUSTER_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express() // Creating the API

app.use((req, res, next) => { // adding headers
  res.setHeader('Access-Control-Allow-Origin', '*') // allow request from any port
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization') // alow to had those headers for a request
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS') // allowing those types of request
  next()
})
app.use(bodyParser.json({ limit: "1kb" })) // parsing the request and limiting its size 
app.use(mongoSanitize()) // sanitizing the request to prevent injection attacks 
app.use(helmet()) // setting various HTTP headers to protect the connections

//part for the files with multer
app.use('/images', express.static(path.join(__dirname, 'images')));// telling to express where to find and stock the files that will be sent and get 

// all the routes
app.use('/api/sauces', apiLimiter, sauceRoutes)
app.use('/api/auth', apiLimiter, userRoutes)

// exporting app
module.exports = app