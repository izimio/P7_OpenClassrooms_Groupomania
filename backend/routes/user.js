const express = require('express') 
const router = express.Router() 
const userCtrl = require('../controllers/user') 

// as in the sauce we reduce the URL to / 
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)

// exporting
module.exports = router;  