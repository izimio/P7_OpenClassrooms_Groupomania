const jwt = require('jsonwebtoken')
const models = require('../models')
const {
     Op
} = require("sequelize")
exports.createComment = (req, res, next) => {
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
     const userId = decodedToken.userId

     const body = req.body.body
     const postId = req.params.id

     if (body.length < 2 || body.length == null) {
          return res.status(400).json({ error: 'Merci de remplir tous les champs.' })
     }

     models.Post.findOne({
          attributes: ['id', 'userId', 'username', 'body'],
          where: { id: postId } 
     })
          .then(post => {
               if (post == null || post.id != postId) { 
                    return res.status(400).json({ error: 'Une erreur est survenue' })
               }
               models.User.findOne({ 
                    attributes: ['id', 'username'],
                    where: { id: userId }
               })
                    .then(user => {
                         models.Comment.create({ 
                              UserId: userId,
                              PostId: post.id,
                              username: user.username,
                              body: body,
                         })
                              .then(comment => {
                              res.status(201).json({ message: 'Commentaire ajouté ! '})
                              })
                              .catch(error => res.status(500).json({ error })) 

                    })
                    .catch(error => res.status(500).json({ error })) 
          })
          .catch(error => res.status(403).json({ error: 'saisie incorrect' }))
}

exports.getOneComment = (req, res, next) => {
     models.Comment.findOne({
               attributes: ['id', 'PostId', 'UserId', 'username', 'body', 'createdAt', 'updatedAt'],
               where: {
                    id: req.params.id
               }
          })
          .then(comment => {
               if (comment == null) {
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
     models.Comment.findAll({
               attributes: ['id', 'PostId', 'UserId', 'username', 'body', 'createdAt', 'updatedAt'],
               where: {
                    PostId: req.params.id
               },
               order: [
                    ['updatedAt', 'DESC']
               ],
          })
          .then(comment => {
               if (comment.length == 0) {
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

     models.Comment.findOne({
               where: {
                    id: req.params.id
               } 
          })
          .then(comment => {
               if (comment.UserId === userId) { 
                    return models.Post.findOne({
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
                                   error: 'Impossible de supprimer le commentaire.'
                              })
                         }
                         models.Post.findOne({
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

     models.Comment.findOne({
               attributes: ['id', 'PostId', 'UserId', 'body'],
               where: {
                    id: req.params.id
               }
          })
          .then(comment => {
               if (message === comment.body || message === null || message.length < 2) {
                    return res.status(400).json({
                         error: 'Pas de mise à jour à faire ou champs vide.'
                    })
               }
               if (comment.UserId === userId) {
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
               models.User.findOne({
                         attributes: ['id', 'role'],
                         where: {
                              id: userId
                         }
                    })
                    .then(userAdmin => {
                         console.log(userAdmin.role)
                         if (userAdmin.role != true) {
                              return res.status(406).json({
                                   error: 'Impossible de modifier ce commentaire.'
                              })
                         }
                         comment.update({
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