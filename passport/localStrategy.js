const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = async () => {
    console.log("localStrategy 수행 시작");
    passport.use(new localStrategy({
        usernameField: 'user_id',
        passwordField: 'user_password',
    }, async (user_id,user_password,done)=>{
        try {
            const exUser = await User.findOne({where:{user_id}});
            if (exUser) {
                console.log("localStrategy 수행 시작");
                const result = await bcrypt.compare(user_password,exUser.user_password);
                if (result) {
                    done(null,exUser);
                } else {
                    console.log('not matched password');
                    done(null, false, {message:'not match password'});
                }
            } else {
                done(null, false, {message:'Not Join Member'});
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    }));
    console.log("localStrategy 수행 완료");
}