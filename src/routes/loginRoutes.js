const express = require('express');
const loginRouter = express.Router();
const passport = require('passport');


function router(){
    loginRouter.get('/',function(req,res){
        res.render("login",{
            
            title:'Library'
        });
    });

    loginRouter.post('/', (req,res,next) => {
        passport.authenticate('local',{
            successRedirect: '/home',
            failureRedirect: '/login',
            failureFlash: true
        })(req,res,next);
    });
    
    return loginRouter;

}

module.exports = router;
