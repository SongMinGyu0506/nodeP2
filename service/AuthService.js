const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const express = require('express');

const app = express()

app.use(express.urlencoded({extended:false}));
app.use(express.json());


exports.isLoggedIn = (req,res,next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('Must LogIn');
    }
};

exports.isNotLoggedIn = (req,res,next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('Already Log-IN');
        //res.redirect(`/?error=${message}`);
    }
};

exports.joinAccountPost = async (req,res,next) => {
    console.log(req.body);
    const {user_id,user_password,name,phone_number,email} = req.body;
    try {
        const exUser = await User.findOne({where:{user_id}});
        console.log(exUser);
        if (exUser) {
            return res.send('Exist Account');
        }
        const hash = await bcrypt.hash(user_password,12);
        await User.create({
            user_id,
            user_password: hash,
            name,
            phone_number,
            email,
        });
        return res.send('success');
    } catch(err) {
        console.error(err);
        next(err)
    }
};

exports.loginAccountPost = async (req,res,next) => {
    console.log("loginAccountPost 진입 성공");
    passport.authenticate('local',(authError,user,info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            return res.redirect('Failed');
        }
        return req.login(user,(loginError)=>{
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.send("success");
        });
    })(req,res,next);
    console.log("loginAccountPost 수행 완료");
};

exports.logoutAccountGet = (req,res,next)=>{
    req.logout();
    req.session.destroy();
    res.send("Success");
};