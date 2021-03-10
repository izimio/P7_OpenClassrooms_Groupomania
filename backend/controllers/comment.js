const jwt = require('jsonwebtoken')
const models = require('../models')
const {
     Op
} = require("sequelize")
exports.createComment = (req, res, next) => {
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET) // getting the token
     const userId = decodedToken.userId

     const body = req.body.body
     const postId = req.params.id

     if (body.length < 2 || body.length == null) { // checking if the comment is long enought
          return res.status(400).json({
               error: 'Merci de remplir tous les champs.'
          })
     }

     models.Post.findOne({ // searching for the post to comment
               attributes: ['id', 'userId', 'body'],
               where: {
                    id: postId
               }
          })
          .then(post => {
               if (post == null || post.id != postId) { // if not
                    return res.status(400).json({
                         error: 'Une erreur est survenue'
                    })
               }
               models.User.findOne({ // adding the right user id with the comment
                         attributes: ['id'],
                         where: {
                              id: userId
                         }
                    })
                    .then(user => {
                         models.Comment.create({ // creating the comment
                                   UserId: userId,
                                   PostId: post.id,
                                   body: body,
                              })
                              .then(comment => {
                                   res.status(201).json({
                                        message: 'Commentaire ajouté ! '
                                   })
                              })
                              .catch(error => res.status(500).json({
                                   error
                              }))

                    })
                    .catch(error => res.status(500).json({
                         error
                    }))
          })
          .catch(error => res.status(403).json({
               error: 'saisie incorrect'
          }))
}

exports.getOneComment = (req, res, next) => {
     models.Comment.findOne({ // getting the comment in our DB linked with the right id
               attributes: ['id', 'PostId', 'UserId', 'body', 'createdAt', 'updatedAt'],
               where: {
                    id: req.params.id
               }
          })
          .then(comment => {
               if (comment == null) { // if doesn't exist
                    return res.status(404).json({
                         error: 'Ce commentaire n\'existe pas !'
                    })
               }
               res.status(200).json({
                    comment
               })
          })
          .catch(error => res.status(403).json({
               error: 'Commentaire non trouvé'
          }))
}

exports.getAllComment = (req, res, next) => {
     models.Comment.findAll({ // getting all the comment related to a postId
               attributes: ['id', 'PostId', 'UserId', 'body', 'createdAt', 'updatedAt'],
               where: {
                    PostId: req.params.id
               },
               order: [ // ordering them 
                    ['updatedAt', 'DESC']
               ],
               include: [{ // joining with the user table to get the username linked with the id 
                    model: models.User,
                    attributes: ['username'],
               }]
          })
          .then(comment => {
               if (comment.length == 0) { // if there are no comment
                    return res.status(200).json({
                         message: 'Cette publication ne contient aucun commentaire'
                    })
               }
               res.status(200).json({
                    comment
               })
          })
          .catch(error => {
               res.status(400).json({
                    error: error
               })
          })
}

exports.deleteComment = (req, res, next) => {
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
     const userId = decodedToken.userId

     models.Comment.findOne({ // getting the comment to destroy
               where: {
                    id: req.params.id
               }
          })
          .then(comment => {
               if (comment.UserId === userId) { // if the user is the owner of the commennt
                    return models.Post.findOne({
                              where: {
                                   id: comment.PostId
                              }
                         })
                         .then(post => {
                              comment.destroy() // destroy the comment
                                   .then(() => res.status(200).json({
                                        message: 'Commentaire supprimé !'
                                   }))
                                   .catch(error => res.status(400).json({
                                        error: 'Impossible de supprimer !'
                                   }));
                         })
                         .catch(error => res.status(400).json({
                              error: 'Impossible de trouver le post !'
                         }));
               }
               models.User.findOne({ // if the user who wants to destroy this comment isn't his owner, check if he is an admin
                         attributes: ['id', 'role'],
                         where: {
                              id: userId
                         }
                    })
                    .then(userAdmin => {
                         if (userAdmin.role != true) { // if not
                              return res.status(406).json({
                                   error: 'Impossible de supprimer le commentaire.'
                              })
                         }
                         models.Post.findOne({ // then
                                   where: {
                                        id: comment.PostId
                                   }
                              })
                              .then(post => {
                                   comment.destroy()
                                        .then(() => res.status(200).json({
                                             message: 'Commentaire supprimé !'
                                        }))
                                        .catch(error => res.status(400).json({
                                             error: 'Impossible de supprimer !'
                                        }));
                              })
                              .catch(error => res.status(400).json({
                                   error: 'Impossible de trouver le post !'
                              }));
                    })
                    .catch(error => res.status(404).json({
                         error: 'Utilisateur non trouvé !'
                    }))

          })
          .catch(error => {
               res.status(404).json({
                    error: 'Commentaire non trouvé !'
               })
          });
}

exports.updateComment = (req, res, next) => {
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
     const userId = decodedToken.userId

     const message = req.body.body

     models.Comment.findOne({ // finding the comment to update
               attributes: ['id', 'PostId', 'UserId', 'body'],
               where: {
                    id: req.params.id
               }
          })
          .then(comment => {
               if (message === comment.body || message === null || message.length < 2) { // checking if the modify comment fills the conditions 
                    return res.status(400).json({
                         error: 'Pas de mise à jour à faire ou champs vide.'
                    })
               }
               if (comment.UserId === userId) { // if the person who wnats to modify the comment is its owner 
                    return comment.update({
                              body: message
                         })
                         .then(() => res.status(200).json({
                              message: 'Commentaire modifié !'
                         }))
                         .catch(error => res.status(400).json({
                              error: 'Impossible de mettre à jour !'
                         }));
               }
               models.User.findOne({ // then check if the user is an admin 
                         attributes: ['id', 'role'],
                         where: {
                              id: userId
                         }
                    })
                    .then(userAdmin => {
                         if (userAdmin.role != true) { // if not
                              return res.status(406).json({
                                   error: 'Impossible de modifier ce commentaire.'
                              })
                         }
                         comment.update({ // then
                                   body: message
                              })
                              .then(() => res.status(200).json({
                                   message: 'Commentaire modifié !'
                              }))
                              .catch(error => res.status(400).json({
                                   error: 'Impossible de mettre à jour !'
                              }));
                    })
                    .catch(error => res.status(404).json({
                         error: 'Post non trouvé !'
                    }))

          })
          .catch(error => {
               res.status(404).json({
                    error: 'Commentaire non trouvé !'
               })
          });
}