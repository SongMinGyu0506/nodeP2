const passport = require('passport');
const local = require('./localStrategy')
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user,done)=>{
        console.log("serializeUser 수행 시작");
        console.log(user.user_id);
        done(null,user.user_id);
        console.log("serializeUser 수행 완료");
    });
    passport.deserializeUser(async (user_id,done)=>{
        console.log("deserailizeUser 수행 시작");
        await User.findOne({where:{user_id}})
            .then(user_id => {
                console.log("success!!!!");
                done(null,user_id)
            })
            .catch(err => {
                console.log("Error!!!!!");
                done(err)
            });
        console.log("deserailizeUser 수행 완료");
    });
    local();
};