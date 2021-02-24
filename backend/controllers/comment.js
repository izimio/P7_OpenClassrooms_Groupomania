const jwt = require('jsonwebtoken') 
const models = require('../models') 
const { Op } = require("sequelize")

exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decodedToken.userId

    const body = req.body.body
    const postId = req.params.id

    if (body.length < 2 || body.length == null) {
         return res.status(400).json({ error: 'Champs manquant ou erroné' })
    }

    models.Post.findOne({
         attributes: ['id', 'userID', 'username'],
         where: { id: postId }
    })
         .then(post => {
              if (post == null || post.id != postId) { 
                   return res.status(400).json({ error: 'Une erreur est survenue lors de la ceation du commentaire' })
              }
              models.User.findOne({ 
                   attributes: ['id', 'username'],
                   where: { id: userId }
              })
                   .then(user => {
                        models.Comment.create({ 
                             userID: userId,
                             postId: postId,
                             username: user.username,
                             body: body,
                        })
                             .then(comment => {
                                res.status(201).json({ message: 'commentaire posté ! '})
                            })
                             .catch(error => res.status(500).json({ error: "un probleme est survenue" })) 

                   })
                   .catch(error => res.status(500).json({ error })) 
         })
         .catch(error => res.status(403).json({ error: 'Post incorrect' }))
}

exports.getAllComment = (req, res, next) => {
    models.Comment.findAll({
         attributes: ['id', 'PostId', 'UserID', 'username', 'body', 'createdAt', 'updatedAt'],
         where: { PostId: req.params.id } 
    })
         .then(comment => {
              console.log("comment", comment)
              if (comment.length == 0) {
                   return res.status(200).json({ message: 'Cette publication ne contient aucun commentaire' })
              }
              res.status(200).json({ comment })
         })  
         .catch(error => { res.status(400).json({ error: error }) })
}
