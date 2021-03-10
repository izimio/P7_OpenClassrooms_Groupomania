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
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET) // getting the token
     const userId = decodedToken.userId

     const title = req.body.title
     const body = req.body.body
     const media = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null) // ternary operator to adjust the media with the right value
     if (title.length <= 2 || body.body <= 2) { // checking the length of the post 
          return res.status(400).json({
               error: 'Champs manquant ou incorrect'
          })
     }
     models.User.findOne({
               attributes: ['id'],
               where: {
                    id: userId
               }
          })
          .then(user => {
               models.Post.create({ // creating the post 
                         UserId: userId,
                         include: [{
                              model: models.User,
                              where: {
                                   id: userId
                              },
                         }],
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
     models.Post.findAll({ // getting all the post related to a user defined by the req.params.id
               attributes: ['id', 'title', 'body', 'userId', 'media', 'createdAt', 'updatedAt'],
               order: [
                    ['updatedAt', 'DESC']
               ],
               where: {
                    userId: req.params.id
               },

          })
          .then(post => {
               if (!post[0]) { // if there are no post
                    return res.status(404).json({
                         error: 'Cet utilisateur n\'a jamais posté'
                    })
               }
               res.status(200).json({ // then
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
     models.Post.findAll({ // getting all the post and order them by update
               attributes: ['id', 'title', 'body', 'userId', 'media', 'createdAt', 'updatedAt'],
               order: [
                    ['updatedAt', 'DESC']
               ],
               include: [{ // joining with the user table to get the usernaùe
                    model: models.User,
                    attributes: ['username'],
               }]
          })
          .then(post => {
               if (post == null) { // if there are no post
                    return res.status(404).json({
                         error: 'Ce post n\'existe pas !'
                    })
               }
               res.status(200).json({ // then
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
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET) // getting the token
     const userId = decodedToken.userId

     const title = req.body.title
     const body = req.body.body
     const media = req.body.media

     if (title.length <= 2 || body.length <= 2) { // checking fi the new post is long enought
          return res.status(400).json({
               error: 'Champs  manquant ou erroné'
          })
     }
     models.Post.findOne({ // finding the user who wants to modify
               attributes: ['id', 'UserId', 'title', 'body', 'media', 'updatedAt'],
               where: {
                    id: req.params.id
               }
          })
          .then(post => {
               let newMedia = post.media; // copying the media
               // condition to check if the user is adding / deleting  / not adding a media
               if (req.body.imgChange != post.media || req.file) {
                    if (post.media) {
                         const filename = post.media.split('/images/')[1]; // deleting the linked file
                         fs.unlink(`images/${filename}`, () => {})
                    }
                    newMedia = null
               }
               if (title == post.title && body == post.body && req.body.imgChange == post.media) { // if everything is already up to date
                    return res.status(400).json({
                         error: 'Le post est déjà à jour'
                    })
               }
               if (post.UserId == userId) { // if the user isn't an admin but is the owner of the post
                    return post.update({
                              title: title,
                              body: body,
                              media: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : newMedia), // linking with the right media
                         })
                         .then(() => res.status(200).json({
                              message: 'Post modifié !'
                         }))
                         .catch(error => res.status(400).json({
                              error: 'Une erreur est survenue lors de la modification du post'
                         }));
               }
               models.User.findOne({ // if the user isn't the owner, check if he is an admin
                         attributes: ['id', 'role'],
                         where: {
                              id: userId
                         }
                    })
                    .then(userAdmin => {
                         if (userAdmin.role != true) { // if not
                              return res.status(406).json({
                                   error: 'Impossible de modifier ce post.'
                              })
                         }
                         post.update({ // then
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
     models.Post.findOne({ // getting one post linked with the right Id
               attributes: ['id', 'title', 'body', 'userId', 'media', 'createdAt', 'updatedAt'],
               where: {
                    id: req.params.id
               },
               include: [{ // getting the username by joining the tables with the User one
                    model: models.User,
                    attributes: ['username'],
               }]
          })
          .then(Post => {
               if (Post == null) { // if there are no post
                    return res.status(404).json({
                         error: 'Ce Post n\'existe pas !'
                    })
               }
               res.status(200).json({ // then
                    Post
               })
          })
          .catch(error => res.status(403).json({
               error: 'Post non trouvé'
          }))
}


exports.deletePost = (req, res, next) => {
     const token = req.headers.authorization.split(' ')[1]
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET) // getting token
     const userId = decodedToken.userId

     models.Post.findOne({ // find the post related to the req.params.id
               attributes: ['id', 'title', 'body', 'UserId', 'media', 'createdAt', 'updatedAt'],
               where: {
                    id: req.params.id
               }
          })
          .then(post => {
               if (post.UserId === userId) { // if the user isn't an admin but still the owner of the post
                    if (post.media != null) {
                         const filename = post.media.split('/images/')[1]; // deleting the linked file inside our folder
                         fs.unlink(`images/${filename}`, () => {})
                    }
                    return post.destroy() // Destroying the post
                         .then(() => res.status(200).json({
                              message: 'Post supprimé !'
                         }))
                         .catch(error => {
                              res.status(400).json({
                                   error: 'Un problème est survenue lors de la suppression'
                              })
                         });
               }
               models.User.findOne({ // if the user isn't the owner, check if he is an admin
                         attributes: ['id', 'role'],
                         where: {
                              id: userId
                         }
                    })
                    .then(userAdmin => {
                         if (userAdmin.role != true) { // if not
                              return res.status(406).json({
                                   error: 'Un problème est survenue lors de la suppression'
                              })
                         }
                         if (post.media != null) {
                              const filename = post.media.split('/images/')[1]; // deleting the linked file inside our folder
                              fs.unlink(`images/${filename}`, () => {})
                         }
                         post.destroy() // then
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