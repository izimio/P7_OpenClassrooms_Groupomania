const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const models = require('../models')
const {
     Op
} = require("sequelize");

exports.signup = (req, res, next) => {
     const email = req.body.email
     const username = req.body.username
     const password = req.body.password

     const regexEmail = /^[a-z0-9._-ç]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
     const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{3,}$/gm

     if (email == null || username == null || password == null) {
          return res.status(400).json({
               error: 'Champs manquant'
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

     models.User.findOne({
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
               if (!userFound) {
                    bcrypt.hash(password, 10)
                         .then(hash => {
                              const tmp = hash;
                              bcrypt.hash(email, 10)
                                   .then(hash => {
                                        const user = models.User.create({ // Creating the user
                                                  email: hash,
                                                  username: username,
                                                  password: tmp,
                                                  role: 0
                                             })
                                             .then(user => {
                                                  console.log("user créé", user)
                                                  res.status(201).json({
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
                                             .catch(error => res.status(500).json({
                                                  error
                                             }))
                                   }).catch(error => res.status(500).json({
                                        error
                                   }))
                         })
                         .catch(error => res.status(500).json({
                              error: "Une erreur est survenue"
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
     const username = req.body.username

     if (email == null || password == null || username == null) {
          return res.status(400).json({
               error: 'Champs manquant'
          })
     }

     models.User.findOne({
               attributes: ['email', 'password', "username"],
               where: {
                    username: username
               }
          })
          .then(user => {
               if (user) {
                    bcrypt.compare(password, user.password)
                         .then(valid => {
                              if (!valid) {
                                   return res.status(406).json({
                                        error: 'Email ou mot de passe incorrect!'
                                   })
                              } else {
                                   bcrypt.compare(email, user.email)
                                        .then(valid2 => {
                                             if (!valid2) {
                                                  return res.status(406).json({
                                                       error: 'Email ou mot de passe incorrect!'
                                                  })
                                             }
                                             res.status(200).json({
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
                                        }).catch(error => res.status(403).json({
                                             error: 'Email ou mot de passe incorrect!'
                                        }))
                              }
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
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
     const userId = decodedToken.userId
     models.User.findOne({
               attributes: ['id', 'role', 'username'],
               where: {
                    id: req.params.id
               }
          })
          .then(user => {
               if (user.id === userId) {
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
               models.User.findOne({
                         attributes: ['id', 'role'],
                         where: {
                              id: userId
                         }
                    })
                    .then(userAdmin => {
                         if (userAdmin.role != true) {
                              return res.status(406).json({
                                   error: 'Un problème est survenue lors de la supprésion de l\'utilisateur.'
                              })
                         }
                         user.destroy()
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
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
     const userId = decodedToken.userId

     const username = req.body.username

     models.User.findOne({
               attributes: ['id', 'role', 'username'],
               where: {
                    id: req.params.id
               }
          })
          .then(user => {
               if (username == user.username) {
                    return res.status(406).json({
                         error: 'Pas de modification'
                    })
               }
               if (user.id == userId) {
                    return user.update({
                              username: username
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
                    .then(userAdmin => {
                         if (userAdmin.role != 1) {
                              return res.status(406).json({
                                   error: 'Impossible de modifier cet utilisateur.'
                              })
                         } else if (userAdmin.role == 1) {
                              user.update({
                                        username: username
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
}

exports.getUser = (req, res, next) => {
     models.User.findOne({
               attributes: ['id', 'username', 'email'],
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