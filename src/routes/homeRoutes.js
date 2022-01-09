const express = require('express');
const homeRouter = express.Router();
const { ensureAuthenticated } = require('../config/auth');

function router(nav){
    homeRouter.get('/',ensureAuthenticated, function(req,res){
        res.render("home",{
            nav,
            title:'Library'
        });
    });
return homeRouter;
}
    
module.exports = router;