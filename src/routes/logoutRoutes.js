const express = require('express');
const logoutRouter = express.Router();
const passport = require('passport');

function router(){
    logoutRouter.get('/', (req,res) =>{
        req.logout();
        req.flash('success_msg','You are logged out');
        res.redirect('/login');
    });

    return logoutRouter;

}

module.exports = router;
