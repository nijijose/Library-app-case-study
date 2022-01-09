const express = require('express');
const multer = require('multer');
const updateauthorRouter = express.Router();
const Authordata = require('../model/Authordata');
const { ensureAuthenticated } = require('../config/auth');
const { ensureAuthorized } = require('../config/authadmin');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
});


function router(nav){
    updateauthorRouter.get('/',ensureAuthenticated, function(req,res){
        res.render('updateauthor',{
            nav,
            title:'Library'
        });
    });

    updateauthorRouter.get('/:id',ensureAuthorized, function(req,res){
        const id = req.params.id;
        Authordata.findById(id,function(err,doc){
            if(!err){
                res.render('updateauthor',{
                    nav,
                    title:'Library',
                    author: doc 
                });
            }
            else{
                console.log(err);
            }
        });
    });

    updateauthorRouter.post('/:id', upload.single('image'), function(req,res){
        const id = req.params.id;
        var updatedlist = {
            author: req.body.author,
            genre: req.body.genre,
            image: req.file.filename
        }

        Authordata.updateOne({_id:id}, updatedlist, (err)=>{
            if(!err){
                res.redirect('/authors');
            }
            else{
                console.log(err);
            }
        });
    });

    return updateauthorRouter;
}

module.exports = router;