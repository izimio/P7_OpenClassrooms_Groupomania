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