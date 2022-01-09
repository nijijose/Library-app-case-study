module.exports={
    ensureAuthorized: function(req,res,next){
        if(req.user.authorization =="Admin"){
            return next();
        }
        req.flash('err_msg','Sorry! You are not authorized to edit/modify this page');
        res.redirect('/home');
    }
}