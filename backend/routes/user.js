const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const db = require('../models');
const userCtrl = require('../controllers/user')


router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/:id",auth, userCtrl.deleteUser);
router.put('/:id', auth, userCtrl.updateUser); 
module.exports = router;