const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const db = require('../models');
const commentCtrl = require('../controllers/comment')

router.post('/:id', auth, commentCtrl.createComment)
router.get('/post/:id', auth, commentCtrl.getAllComment)
router.get('/:id', auth, commentCtrl.getOneComment)
//router.put('/:id', auth, commentCtrl.updateComment)
//router.delete('/:id', auth, commentCtrl.deleteComment)
module.exports = router;
