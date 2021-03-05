const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const models = require('../models')
const multer = require('multer')
const fs = require('fs')

const {
     Op
} = require("sequelize")


exports.createPost = (req, res, next) => {
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
     const userId = decodedToken.userId

     const title = req.body.title
     const body = req.body.body
     console.log(req.body.title)
     const media = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)
     console.log(media)
     if (title.length <= 2 || body.body <= 2) {
          return res.status(400).json({
               error: 'Champs manquant ou incorrect'
          })
     }
     models.User.findOne({
               attributes: ['id', 'username'],
               where: {
                    id: userId
               }
          })
          .then(user => {
               models.Post.create({
                         UserId: userId,
                         include: [{
                              model: models.User,
                              where: {
                                   id: userId
                              },
                         }],
                         username: user.username,
                         title: title,
                         body: body,
                         media: media,
                    })
                    .then(post => {
                         res.status(201).json({
                              message: "Post crée avec succès"
                         })
                    })
                    .catch(error => res.status(500).json({
                         error
                    }))
          })
          .catch(error => res.status(400).json({
               error: 'Utilisateur inconnu !'
          }))
}


exports.getOneUserAllPosts = (req, res, next) => {
     models.Post.findAll({
               attributes: ['id', 'title', 'body', 'username', 'userId', 'media', 'createdAt', 'updatedAt'],
               order: [
                    ['updatedAt', 'DESC']
               ],
               where: {
                    userId: req.params.id
               }
          })
          .then(post => {
               if (!post[0]) {
                    return res.status(404).json({
                         error: 'Cet utilisateur n\'a jamais posté'
                    })
               }
               res.status(200).json({
                    post
               })
          })
          .catch(error => {
               res.status(400).json({
                    error: "Une erreur est survenue"
               })
          })

}

exports.getAllPost = (req, res, next) => {
     models.Post.findAll({
               attributes: ['id', 'title', 'body', 'username', 'userId', 'media', 'createdAt', 'updatedAt'],
               order: [
                    ['updatedAt', 'DESC']
               ],
          })
          .then(post => {
               if (post == null) {
                    return res.status(404).json({
                         error: 'Ce post n\'existe pas !'
                    })
               }
               res.status(200).json({
                    post
               })
          })
          .catch(error => {
               res.status(400).json({
                    error: error
               })
          })

}

exports.updatePost = (req, res, next) => {
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
     const userId = decodedToken.userId

     const title = req.body.title
     const body = req.body.body
     const media = req.body.media

     if (title.length <= 2 || body.length <= 2) {
          return res.status(400).json({
               error: 'Champs  manquant ou erroné'
          })
     }
     models.Post.findOne({
               attributes: ['id', 'UserId', 'title', 'body', 'media', 'updatedAt'],
               where: {
                    id: req.params.id
               }
          })
          .then(post => {
               let newMedia = post.media;

               if (req.body.imgChange != post.media || req.file) {
                    console.log("JAI ETE TRIGGERED YOUPI")
                    if (post.media) {
                         const filename = post.media.split('/images/')[1]; // deleting the linked file
                         fs.unlink(`images/${filename}`, () => {})
                    }
                    newMedia = null
               }
               if (title == post.title && body == post.body && req.body.imgChange == post.media) {
                    return res.status(400).json({
                         error: 'Le post est déjà à jour'
                    })
               }
               if (post.UserId == userId) {
                    return post.update({
                              title: title,
                              body: body,
                              media: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : newMedia),
                         })
                         .then(() => res.status(200).json({
                              message: 'Post modifié !'
                         }))
                         .catch(error => res.status(400).json({
                              error: 'Une erreur est survenue lors de la modification du post'
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
                                   error: 'Impossible de modifier ce post.'
                              })
                         }
                         post.update({
                                   title: title,
                                   body: body,
                                   media: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : newMedia),
                              })
                              .then(() => res.status(200).json({
                                   message: 'Post modifié !'
                              }))
                              .catch(error => res.status(400).json({
                                   error: 'Une erreur est survenue lors de la modification du post '
                              }));
                    })
                    .catch(error => res.status(404).json({
                         error: 'Post non trouvé !'
                    }))
          })
          .catch(error => {
               res.status(404).json({
                    error: 'Post non trouvé !'
               })
          });
}

exports.getOnePost = (req, res, next) => {
     models.Post.findOne({
               attributes: ['id', 'title', 'body', 'username', 'userId', 'media', 'createdAt', 'updatedAt'],
               where: {
                    id: req.params.id
               }
          })
          .then(Post => {
               if (Post == null) {
                    return res.status(404).json({
                         error: 'Ce Post n\'existe pas !'
                    })
               }
               res.status(200).json({
                    Post
               })
          })
          .catch(error => res.status(403).json({
               error: 'Post non trouvé'
          }))
}


exports.deletePost = (req, res, next) => {
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
     const userId = decodedToken.userId

     models.Post.findOne({
               attributes: ['id', 'title', 'body', 'username', 'UserId', 'media', 'createdAt', 'updatedAt'],
               where: {
                    id: req.params.id
               }
          })
          .then(post => {
               if (post.UserId === userId) {
                    if (post.media != null) {
                         const filename = post.media.split('/images/')[1]; // deleting the linked file
                         fs.unlink(`images/${filename}`, () => {})
                    }
                    return post.destroy()
                         .then(() => res.status(200).json({
                              message: 'Post supprimé !'
                         }))
                         .catch(error => {
                              console.log("error la", error)
                              res.status(400).json({
                                   error: 'Un problème est survenue lors de la suppression'
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
                                   error: 'Un problème est survenue lors de la suppression'
                              })
                         }
                         if (post.media != null) {
                              const filename = post.media.split('/images/')[1]; // deleting the linked file
                              fs.unlink(`images/${filename}`, () => {})
                         }
                         post.destroy()
                              .then(() => res.status(200).json({
                                   message: 'Post supprimé !'
                              }))
                              .catch(error => {
                                   res.status(400).json({
                                        error: 'Un problème est survenue lors de la suppression'
                                   })
                              });
                    })
                    .catch(error => res.status(404).json({
                         error: 'Utilisateur non trouvé !'
                    }))
          })
          .catch(error => {
               res.status(404).json({
                    error: 'Post non trouvé !'
               })
          });
}