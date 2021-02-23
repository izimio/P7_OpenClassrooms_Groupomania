
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const User = require('../models/User') 

// exporting the function
exports.signup = (req, res, next) => { 
     const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{3,}$/gm //regex in order to protect the input
     if (regexPassword.exec(req.body.password) == null){
          res.status(406).json({ message: 'Mot de passe incorrecte ou trop faible' }) 
          return false
     }
     User.find() // getting all the users to check problems
     .then(users => {
          if (users.length === 0) {
               bcrypt.hash(req.body.password, 10) // salting the password with bcrypt
               .then(hash => {
                    const user = new User({ //ceating new user
                         email: req.body.email, // the email will soonly be hashed
                         password: hash // the brand new hashed pw
                    })
                    bcrypt.hash(user.email, 10) // crypting email
                    .then(hash => {
                         user.update(user.email = hash)
                         user.save() //saving the user inside the DB
                         .then(user => {
                              res.status(201).json({ message: 'Utilisateur créé avec succès !' })
                         })
                         .catch(error => res.status(401).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur' }))
                    })
                    .catch(error => res.status(500).json({ error })) 
               })
               .catch(error => res.status(500).json({ error })) 
          } else if (users.length >= 1) { //if the DB is not empty, we will need to check if some infos does not already exist
            let error = {
                numOfUserChecked: 0,
                AlreadySeen: 0
            };
               users.forEach(user => {
                    bcrypt.compare(req.body.email, user.email) //comparing the crypt
                    .then(valid => {
                         if (valid === true) {
                             error.AlreadySeen++; 
                              res.status(406).json({ message: 'l\'adresse email est déjà utilisée' })
                         } else if (valid === false) {
                            error.numOfUserChecked++;
                              if (error.numOfUserChecked == users.length && error.AlreadySeen == 0) { //if the infos has not already been used, let's create a new user
                                   bcrypt.hash(req.body.password, 10) 
                                   .then(hash => {
                                        const user = new User({ //creating the new user
                                             email: req.body.email, 
                                             password: hash 
                                        })
                                        bcrypt.hash(user.email, 10)
                                        .then(hash => {
                                             user.update(user.email = hash)
                                             user.save() 
                                             .then(user => {
                                                  res.status(201).json({ message: 'Utilisateur créé avec succès!' })
                                             })
                                             .catch(error => res.status(401).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur' })) 
                                        })
                                        .catch(error => res.status(500).json({ error })) 
                                   })
                                   .catch(error => res.status(500).json({ error })) 
                              } 
                         }
                    })
                    .catch(error => res.status(500).json({ error })) 
               })
          }
     })
     .catch(error => req.status(500).json({ error }))
}

// Login function
exports.login = (req, res, next) => { 
     User.find() //getting all users
     .then(users => {
          if (users.length == 0) {
               return res.status(401).json({ error: 'Utilisateur inconnu !' })
          }
          let NumberOfReject = 0;
          users.forEach(user => { 
               bcrypt.compare(req.body.email, user.email) //comparing the emails
               .then(valid => {
                    if (!valid) { //if it does not match, incrasing the let 
                         NumberOfReject++;
                         if (NumberOfReject == users.length) {
                              return res.status(406).json({ error: 'Mot de passe ou email incorrect !' }) 
                         }
                         return
                    }
                    bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                         if (!valid) {
                              return res.status(406).json({ error: 'Mot de passe ou email incorrect !' }) 
                         }
                         else{
                            res.status(200).json({ 
                                userId: user._id, 
                                token: jwt.sign( // returning the brand new token
                                     { userId: user._id },
                                     process.env.JWT_SECRET,
                                     { expiresIn: '24h' } // make the token expire after 24h !
                                )
                           })
                         }
                    })
                    .catch(error => res.status(500).json({ error })) //in case of internal error 
               })
               .catch(error => res.status(500).json({ error }))
          })
     })
     .catch(error => req.status(500).json({ error })) // in cse of mongo's error
}