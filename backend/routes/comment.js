const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const db = require('../models');
const commentCtrl = require('../controllers/comment')

router.post('/:id', auth, commentCtrl.createComment)
module.exports = router;
