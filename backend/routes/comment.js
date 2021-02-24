const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const db = require('../models');
const commentCtrl = require('../controllers/comment')

router.post('/:id', auth, commentCtrl.createComment)
router.get('/post/:id', auth, commentCtrl.getAllComment)
module.exports = router;
