const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const models = require('../models')
const fs = require('fs')
const {
     Op
} = require("sequelize");


exports.signup = (req, res, next) => {
     const email = req.body.email
     const username = req.body.username
     const password = req.body.password

     const regexEmail = /^[a-z0-9._-ç]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/ // regexes the check the inputs
     const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{3,}$/


     // if forest to check once again the inputs
     if (!email[0] || !username[0] || !password[0]) {
          return res.status(400).json({
               error: 'Champs manquant'
          })
     }
     if (username.length < 3) {
          return res.status(406).json({
               error: 'pseudo trop court !'
          })
     }

     if (password.length < 7) {
          return res.status(406).json({
               error: 'Mot de passe trop court !'
          })
     }

     if (!regexEmail.test(email)) {
          return res.status(406).json({
               error: 'Email erroné !'
          })
     }
     if (!regexPassword.test(password)) {
          return res.status(406).json({
               error: 'Mot de passe trop faible !'
          })
     }

     models.User.findOne({ // checking if the user does not already exist
               attributes: ['email', 'username', 'role'],
               where: {
                    [Op.or]: [{
                              email: email
                         },
                         {
                              username: username
                         }
                    ]
               }
          })
          .then(userFound => {
               if (!userFound) { // if the user isn't found, create it 
                    bcrypt.hash(password, 10) // hashing the infos
                         .then(hash => {
                              const user = models.User.create({ // Creating the user
                                        email: email,
                                        username: username,
                                        password: hash,
                                        role: 0
                                   })
                                   .then(user => {
                                        res.status(201).json({
                                             userId: user.id,
                                             role: user.role,
                                             token: jwt.sign({ // creating the JWT 
                                                       userId: user.id
                                                  },
                                                  process.env.JWT_SECRET, {
                                                       expiresIn: '12h'
                                                  }
                                             )
                                        })
                                   })
                                   .catch(error => res.status(500).json({
                                        error
                                   }))
                         })
                         .catch(error => res.status(500).json({
                              error
                         }))

               } else {
                    return res.status(406).json({
                         error: 'Email ou username déjà pris !'
                    })
               }
          })
          .catch(error => res.status(500).json({
               error
          }))
}

exports.login = (req, res, next) => {
     const email = req.body.email
     const password = req.body.password

     if (email == null || password == null) {
          return res.status(400).json({
               error: 'Champs manquant'
          })
     }

     models.User.findOne({ //getting the user linked with the email
               attributes: ['email', 'password', 'role', 'id'],
               where: {
                    email: email
               }
          })
          .then(user => {
               if (user) {
                    bcrypt.compare(password, user.password) // compare the passwords
                         .then(valid => {
                              if (!valid) {
                                   return res.status(406).json({ // if it does not match
                                        error: 'Email ou mot de passe incorrect!'
                                   })
                              }
                              res.status(200).json({ // then
                                   userId: user.id,
                                   role: user.role,
                                   token: jwt.sign({
                                             userId: user.id
                                        },
                                        process.env.JWT_SECRET, {
                                             expiresIn: '12h'
                                        }
                                   )
                              })
                         })
                         .catch(error => res.status(403).json({
                              error: 'Email ou mot de passe incorrect!'
                         }))
               } else {
                    return res.status(400).json({
                         error: 'Utilisateur inconnu !'
                    })
               }
          })
          .catch(error => res.status(403).json({
               error: 'Email ou mot de passe incorrect!'
          }))
}

exports.deleteUser = (req, res, next) => {
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET) // getting token
     const userId = decodedToken.userId

     const elem = req.body.body

     models.User.findOne({ // getting the user
               attributes: ['id', 'role', 'username'],
               where: {
                    id: req.params.id
               }
          })
          .then(user => {
               if (user.id === userId && elem == user.username) { // if the confirmation is right and the user is deleting himself
                    return user.destroy()
                         .then(() => res.status(200).json({
                              message: 'Utilisateur supprimé !'
                         }))
                         .catch(error => {
                              res.status(400).json({
                                   error: 'Impossible de supprimer !'
                              })
                         });
               }
               models.User.findOne({ // if the user.id isn't matching, check if the user is an admin
                         attributes: ['id', 'role'],
                         where: {
                              id: userId
                         }
                    })
                    .then(userAdmin => {
                         if (userAdmin.role != true) { // if not
                              return res.status(406).json({
                                   error: 'Un problème est survenue lors de la supprésion de l\'utilisateur.'
                              })
                         }
                         user.destroy() //then
                              .then(() => res.status(200).json({
                                   message: 'Utilisateur supprimé !'
                              }))
                              .catch(error => {
                                   res.status(400).json({
                                        error: 'Impossible de supprimer !'
                                   })
                              });
                    })
                    .catch(error => res.status(404).json({
                         error: 'Utilisateur non trouvé !'
                    }))

          })
          .catch(error => res.status(404).json({
               error: 'Utilisateur non trouvé !'
          }))
}

exports.updateUser = (req, res, next) => {
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET) // getting token
     const userId = decodedToken.userId

     const body = req.body.body
     const value = req.body.value // value will be the variable to define with modification we want to do
     parseInt(value, 10);

     // checking the values
     const regexEmail = /^[a-z0-9._-ç]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
     const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{3,}$/

     if (value == 1 && body.length < 3) {
          return res.status(406).json({
               error: 'pseudo trop court !'
          })
     } else if (value == 2 && !regexEmail.test(body)) {
          return res.status(406).json({
               error: 'Email erroné !'
          })
     } else if (value == 3 && (body.length < 7 || !regexPassword.test(body))) {
          return res.status(406).json({
               error: 'Mot de passe trop court ou incorrecte!'
          })
     }
     if (value == 1) { // modifying the username
          models.User.findOne({
                    attributes: ['username'],
                    where: {
                         username: body
                    }
               })
               .then(userFound => {
                    if (!userFound) { // if the new username isn't already taken
                         models.User.findOne({
                                   attributes: ['id', 'role', 'username'],
                                   where: {
                                        id: req.params.id
                                   }
                              })
                              .then(user => {
                                   if (body == user.username) { // if it is the same
                                        return res.status(406).json({
                                             error: 'Pas de modification'
                                        })
                                   }
                                   if (user.id == userId) { // modify
                                        if (body.length < 3) {
                                             return res.status(406).json({
                                                  error: 'pseudo trop court !'
                                             })
                                        }
                                        return user.update({
                                                  username: body
                                             })
                                             .then(() => res.status(200).json({
                                                  message: 'Utilisateur modifié !'
                                             }))
                                             .catch(error => res.status(400).json({
                                                  error: 'Une erreur est survenue lors de la modification'
                                             }));
                                   }
                                   models.User.findOne({ // checking if he is an admin
                                             attributes: ['id', 'role'],
                                             where: {
                                                  id: userId
                                             }
                                        })
                                        .then(userAdmin => {
                                             if (userAdmin.role != true) { // if not
                                                  return res.status(406).json({
                                                       error: 'Impossible de modifier cet utilisateur.'
                                                  })
                                             } else if (userAdmin.role == 1) { // then
                                                  user.update({
                                                            username: body
                                                       })
                                                       .then(() => res.status(200).json({
                                                            message: 'Utilisateur modifié !'
                                                       }))
                                                       .catch(error => res.status(400).json({
                                                            error: 'Une erreur est survenue lors de la modification'
                                                       }));
                                             }
                                        })
                                        .catch(error => res.status(404).json({
                                             error: 'Utilisateur non trouvé !'
                                        }))

                              })
                              .catch(error => res.status(404).json({
                                   error: 'Utilisateur non trouvé !'
                              }))
                    } else {
                         return res.status(406).json({
                              error: 'Pseudo déjà pris !'
                         })
                    }
               }).catch(error => res.status(500).json({
                    error
               }))
     }
     if (value == 2) { // modifying the email
          models.User.findOne({
                    attributes: ['email'],
                    where: {
                         email: body
                    }
               })
               .then(userFound => {
                    if (!userFound) { // if the new email isn'ty already taken
                         models.User.findOne({
                                   attributes: ['id', 'role', 'username'],
                                   where: {
                                        id: req.params.id
                                   }
                              })
                              .then(user => {
                                   if (body == user.username) {
                                        return res.status(406).json({
                                             error: 'Pas de modification'
                                        })
                                   }
                                   if (user.id == userId) { // if the user is the owner of the account
                                        if (body.length < 3) {
                                             return res.status(406).json({
                                                  error: 'pseudo trop court !'
                                             })
                                        }
                                        return user.update({
                                                  email: body
                                             })
                                             .then(() => res.status(200).json({
                                                  message: 'Utilisateur modifié !'
                                             }))
                                             .catch(error => res.status(400).json({
                                                  error: 'Une erreur est survenue lors de la modification'
                                             }));
                                   }
                                   models.User.findOne({
                                             attributes: ['id', 'role'],
                                             where: {
                                                  id: userId
                                             }
                                        })
                                        .then(userAdmin => { // if not, check if he is an admin
                                             if (userAdmin.role != true) {
                                                  return res.status(406).json({
                                                       error: 'Impossible de modifier cet utilisateur.'
                                                  })
                                             } else if (userAdmin.role == 1) {
                                                  user.update({
                                                            email: body
                                                       })
                                                       .then(() => res.status(200).json({
                                                            message: 'Utilisateur modifié !'
                                                       }))
                                                       .catch(error => res.status(400).json({
                                                            error: 'Une erreur est survenue lors de la modification'
                                                       }));
                                             }
                                        })
                                        .catch(error => res.status(404).json({
                                             error: 'Utilisateur non trouvé !'
                                        }))

                              })
                              .catch(error => res.status(404).json({
                                   error: 'Utilisateur non trouvé !'
                              }))
                    } else {
                         return res.status(406).json({
                              error: 'Email déjà pris !'
                         })
                    }
               }).catch(error => res.status(500).json({
                    error
               }))
     }
     if (value == 3) { // modifying the password
          models.User.findOne({
                    attributes: ['id', 'role', 'username'],
                    where: {
                         id: req.params.id
                    }
               })
               .then(user => {
                    bcrypt.hash(body, 10) // hash the new password
                         .then(hash => {
                              const tmp = hash
                              if (user.id == userId) { // if the user is the owner of the account
                                   return user.update({
                                             password: tmp
                                        })
                                        .then(() => res.status(200).json({
                                             message: 'Utilisateur modifié !'
                                        }))
                                        .catch(error => res.status(400).json({
                                             error: 'Une erreur est survenue lors de la modification'
                                        }));
                              }
                              models.User.findOne({ // if not, check if he is an admin
                                        attributes: ['id', 'role'],
                                        where: {
                                             id: userId
                                        }
                                   })
                                   .then(userAdmin => {
                                        if (userAdmin.role != true) { // if not
                                             return res.status(406).json({
                                                  error: 'Impossible de modifier cet utilisateur.'
                                             })
                                        } else if (userAdmin.role == 1) { // then
                                             user.update({
                                                       password: tmp
                                                  })
                                                  .then(() => res.status(200).json({
                                                       message: 'Utilisateur modifié !'
                                                  }))
                                                  .catch(error => res.status(400).json({
                                                       error: 'Une erreur est survenue lors de la modification'
                                                  }));
                                        }
                                   })
                                   .catch(error => res.status(404).json({
                                        error: 'Utilisateur non trouvé !'
                                   }))
                         })
                         .catch(error => res.status(500).json({
                              error
                         }))

               })
               .catch(error => res.status(404).json({
                    error: 'Utilisateur non trouvé !'
               }))
     }
}


exports.getUser = (req, res, next) => {
     models.User.findOne({ // getting all the informations linked with a user related to the req.params.id
               attributes: ['id', 'username', 'email', 'role'],
               where: {
                    id: req.params.id
               }
          })
          .then(user => {
               if (user == null) {
                    return res.status(404).json({
                         error: 'Utilisateur introuvable !'
                    })
               }
               res.status(200).json({
                    user
               })
          })
          .catch(error => {
               res.status(404).json({
                    error: 'Utilisateur introuvable !'
               })
          })
}

// routes that will unlink all the medias linked with a user if he deletes his account
exports.destroyUserMedias = (req, res, next) => {

     let i = -1;
     while (req.body.body[++i]) {
          if (req.body.body) {
               const filename = req.body.body[i].split('/images/')[1]; // deleting the linked file
               fs.unlink(`images/${filename}`, () => {})
          }
     }
     return res.status(200).json({
          message: "Medias de l'utilisateur supprimé"
     })
}