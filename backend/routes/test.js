const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/test');

//Commentaires
router.get('/oui', userCtrl.all);

module.exports = router;