const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const models = require('../models') 
const { Op } = require("sequelize")

exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decodedToken.userId

    const title = req.body.title
    const body = req.body.body
    const media = req.body.media
    

    if (title.length <= 2 || body <= 2) {
         return res.status(400).json({ error: 'Champs manquant ou incorrect' })
    }
    models.User.findOne({ 
        attributes: ['id', 'username'], 
        where: {id:  userId}
   })
    .then(user => {
        models.Post.create({ 
            UserId: userId,
            include: [{
                 model: models.User,
                 where: { id: userId }, 
            }],
            userID: userId,
            username: user.username,
            title: title,
            body: body,
            media: media,
       })
            .then(post => {
            console.log("post !!!", post)
                 res.status(201).json({ messahe: "Post crée avec succès" })
            })
            .catch(error => res.status(500).json({ error })) 
    })
     .catch(error => res.status(400).json({ error: 'Utilisateur inconnu !' }))
}

exports.getOnePost = (req, res, next) => {
    models.Post.findOne({ //On récupère un post
         attributes: ['id', 'UserId', 'userName', 'title', 'link', 'message', 'like', 'comment', 'commentCount', 'createdAt', 'updatedAt'],
         where: { id: req.params.id } //On récupère notre id post
    })
         .then(post => {
              if (post == null) { //Si null
                   return res.status(404).json({ error: 'Ce post n\'existe pas !' })
              }
              models.Comment.findAll({ //On récupère nos commentaires
                   attributes: ['id', 'PostId', 'UserId', 'userName', 'comment', 'like', 'createdAt', 'updatedAt'],
                   where: { PostId: post.id } //On récupère notre id post
              })
                   .then(comment => {
                        if (comment.length === 0) { //Si pas de commentaire
                             return res.status(200).json({ message: 'Pas de commentaires', post })
                        }
                        post.update(post.comment = comment) //Sinon, on met à jour
                             .then(post => {
                                  res.status(200).json({ message: 'Commentaire du post', post }) //On affiche le pots et ses commentaires
                             })
                             .catch(error => res.status(400).json({ error: 'Impossible d\'afficher les commentaires !' })); //Erreur Bad Request           
                   })
                   .catch(error => res.status(403).json({ error: 'Id incorrect' }))//Erreur server
         })
         .catch(error => res.status(403).json({ error: 'Id incorrect' }))//Erreur server
}