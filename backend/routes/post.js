const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const db = require('../models');
const postCtrl = require('../controllers/post')

router.post('/', auth, postCtrl.createPost)
//router.get('/:id', auth, postCtrl.getOnePost)
router.get('/', auth, postCtrl.getAllPost)
router.put('/:id', auth, postCtrl.updatePost)
module.exports = router;