const express = require('express');
const { isNotLoggedIn, joinAccountPost, loginAccountPost, isLoggedIn, logoutAccountGet } = require('../service/AuthService');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.use(express.urlencoded({extended:false}));
router.use(express.json());


router.post('/join',isNotLoggedIn, joinAccountPost);
router.post('/login',isNotLoggedIn,loginAccountPost,(req,res)=>{
    res.send(req.user);
});
router.get('/logout',isLoggedIn,logoutAccountGet);


module.exports = router;