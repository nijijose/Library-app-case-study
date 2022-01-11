const express = require('express');
const signupRouter = express.Router();
const bcrypt = require('bcrypt');

const Userdata = require('../model/Userdata');

function router(){

    signupRouter.get('/',function(req,res){
        res.render("signup",{
            title:'Library'
        });
    });

    signupRouter.post('/',function(req,res){

        const { username, email, phonenumber, password, password2, authorization } = req.body;
        let errors = [];

        Userdata.findOne({email: email})
           .then(user =>{
            if(user){
                errors.push({ msg: 'Email already exist' });
                res.render('signup',{
                    title:'Library',
                    errors,
                    username,
                    email,
                    phonenumber,
                    password,
                    password2,
                    authorization    
                });
            }
            else{
                const newUserdata = new Userdata({
                    username,
                    email,
                    phonenumber,
                    password,
                    authorization
                });
                
                // hash password
               bcrypt.genSalt(10, (err,salt)=> {
                   bcrypt.hash(newUserdata.password, salt, (err,hash)=>{
                       if(err) throw err;
                       //set password to hashed
                       newUserdata.password = hash;
                       //save user
                       newUserdata.save()
                       .then(user => {
                           req.flash('success_msg','You have successfully signed up and can now login')
                           res.redirect('/login');
                       })
                       .catch(err => console.log(err));
                   })

               });
                
            }
        });

    });

    return signupRouter;
}

module.exports = router;