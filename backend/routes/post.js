const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const db = require('../models');
const postCtrl = require('../controllers/post')

router.post('/', auth, postCtrl.createPost)

module.exports = router;
