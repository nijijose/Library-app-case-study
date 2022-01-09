const express = require('express');
const multer = require('multer');
const authoradminRouter = express.Router();
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
    authoradminRouter.get('/',ensureAuthenticated, function(req,res){
        res.render('addAuthor',{
            nav,
            title:'Library'
        });
    });

    authoradminRouter.post('/add',ensureAuthorized, upload.single('image'),function(req,res){
        console.log(req.file);
        var list = {
            author: req.body.author,
            genre: req.body.genre,
            image: req.file.filename
        }
                var author = Authordata(list);
                author.save();
                res.redirect('/authors');
                      
    });

   
    return authoradminRouter;

}

module.exports = router;