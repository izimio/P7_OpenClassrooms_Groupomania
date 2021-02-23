
// IMPORTS // 
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require("helmet")
const apiLimiter = require("./middleware/limits-rate")
const path = require('path')
const app = express() // Creating the API
const {sequelize, User} = require('./models')
app.use((req, res, next) => { // adding headers
  res.setHeader('Access-Control-Allow-Origin', '*') // allow request from any port
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization') // alow to had those headers for a request
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS') // allowing those types of request
  next()
})

app.use(bodyParser.json({ limit: "1kb" })) // parsing the request and limiting its size 
app.use(helmet()) // setting various HTTP headers to protect the connections
app.use('/images', express.static(path.join(__dirname, 'images')));// telling to express where to find and stock the files that will be sent and get 


app.use(express.json())
// all the routes

app.get('/users', async (req, res) => {

  try {
    const users = await User.findAll()
    return res.json(users)
  }catch(err){
    console.log(err)
    return res.status(500).json({error: 'lol'})
  }
});

app.get('/users/:uuid', async (req, res) => {

  const uuid = req.params.uuid;
  try {
    const users = await User.findOne({
      where: {uuid}
    })
    return res.json(users)
  }catch(err){
    console.log(err)
    return res.status(500).json({error: 'lol'})
  }
})

app.listen({port: 5000}, async() => {
  console.log('serveur up on http://localhost:5000')
  await sequelize.authenticate()
  console.log('Databse connected !')
})

// exporting app
module.exports = app