const express = require('express');
const booksRouter = express.Router();
const Bookdata = require('../model/Bookdata');
const { ensureAuthenticated } = require('../config/auth');
const { ensureAuthorized } = require('../config/authadmin');

function router(nav){
    booksRouter.get('/',ensureAuthenticated, function(req,res){
        Bookdata.find()
        .then(function(books){
            res.render("books",{
                nav,
               title:'Library',
               books
            });

        })
       
    });
 
    booksRouter.get('/:id', function(req,res){
        const id =  req.params.id;
        Bookdata.findOne({_id:id})
        .then(function(book){
            res.render('book',{
                nav,
                title:'Library',
                book
            });

        });
       
    });

    booksRouter.get('/delete/:id',ensureAuthorized, function(req,res){
        const id =  req.params.id;
        Bookdata.findByIdAndDelete({_id:id}, (err)=>{
            if(!err){
                res.redirect('/books')
            }
            else{
                console.log(err);
                res.end(err);
            }
        });

    });

    return booksRouter;
}

module.exports = router;