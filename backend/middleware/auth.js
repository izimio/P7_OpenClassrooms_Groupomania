const jwt = require('jsonwebtoken') 

module.exports = (req, res, next) => {
     try {
          const token = req.headers.authorization.split(' ')[1] //getting the toekn by splitting and removing the bear
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET) // decoding the token
          const userId = decodedToken.userId  
          if (req.body.userId && req.body.userId !== userId) { //checking
               throw 'User ID non valable !'
          } else { // then everything is good 
               next()
          }
     } catch (error) {
          res.status(401).json({ error: error | 'Requête non authentifiée !' })
     }
}