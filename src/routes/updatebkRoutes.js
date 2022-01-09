const express = require('express');
const multer = require('multer');
const updatebookRouter = express.Router();
const Bookdata = require('../model/Bookdata');
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
    updatebookRouter.get('/', ensureAuthenticated, function(req,res){
        res.render('updatebook',{
            nav,
            title:'Library'
        });
    });

    updatebookRouter.get('/:id',ensureAuthorized,function(req,res){
        const id = req.params.id;
        Bookdata.findById(id,function(err,doc){
            if(!err){
                res.render('updatebook',{
                    nav,
                    title:'Library',
                    book: doc 
                });
            }
            else{
                console.log(err);
            }
        });
    });

    updatebookRouter.post('/:id', upload.single('image'), function(req,res){
        const id = req.params.id;
        var updateditem = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            image: req.file.filename
        }

        Bookdata.updateOne({_id:id}, updateditem, (err)=>{
            if(!err){
                res.redirect('/books');
            }
            else{
                console.log(err);
            }
        });
    });

    return updatebookRouter;
}

module.exports = router;