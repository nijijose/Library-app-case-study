const express = require('express');
const authorsRouter = express.Router();
const Authordata = require('../model/Authordata');
const { ensureAuthenticated } = require('../config/auth');
const { ensureAuthorized } = require('../config/authadmin');

function router(nav){
    
    authorsRouter.get('/', ensureAuthenticated, function(req,res){
        Authordata.find()
        .then(function(authors){
            res.render("authors",{
                nav,
               title:'Library',
               authors
            });

        });
        
    });

    authorsRouter.get('/:id',function(req,res){
        const id =  req.params.id;
        Authordata.findOne({_id:id})
        .then(function(author){
            res.render("author",{
                nav,
                title:'Library',
                author
            });
        });
        
    });

    authorsRouter.get('/delete/:id',ensureAuthorized, function(req,res){
        const id =  req.params.id;
        Authordata.findByIdAndDelete({_id:id}, (err)=>{
            if(!err){
                res.redirect('/authors')
            }
            else{
                console.log(err);
                res.end(err);
            }
        });

    });

    return authorsRouter;

}

module.exports = router;

