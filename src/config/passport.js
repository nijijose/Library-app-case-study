const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb+srv://userone:haihello@ictakfiles.hrt5k.mongodb.net/ICTFILES?retryWrites=true&w=majority');

const Userdata = require('../model/Userdata');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email,password,done)=>{
            // match user
            Userdata.findOne({email: email})
            .then(user => {
                if(!user){
                    return done(null, false, {message: 'That email is not registered'});
                }
                //match password
                bcrypt.compare(password, user.password, (err, isMatch) =>{
                    if(err) throw err;

                    if(isMatch){
                        return done(null,user);
                    }
                    else{
                        return done(null,false, {message: 'Incorrect password'});
                    }
                });
            })
            .catch(err => console.log(err));
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
      passport.deserializeUser(function(id, done) {
        Userdata.findById(id, function(err, user) {
          done(err, user);
        });
      });
}