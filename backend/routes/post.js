const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const db = require('../models');
const postCtrl = require('../controllers/post')

router.post('/', auth,multer, postCtrl.createPost)
router.get('/:id', auth, postCtrl.getOnePost)
router.get('/user/:id', auth, postCtrl.getOneUserAllPosts)
router.get('/', auth, postCtrl.getAllPost)
router.put('/:id', auth,multer, postCtrl.updatePost)
router.delete('/:id', auth,multer, postCtrl.deletePost)
module.exports = router;
