const express = require('express');
const multer = require('multer');
const adminRouter = express.Router();
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
    adminRouter.get('/',ensureAuthenticated,ensureAuthorized, function(req,res){
        res.render('addBook',{
            nav,
            title:'Library'
        });
    });

    adminRouter.post('/add', upload.single('image'), function(req,res){
        var item = {
           title: req.body.title,
           author: req.body.author,
           genre: req.body.genre,
           image: req.file.filename
        }

        var book = Bookdata(item);
        book.save(); // saving to database
        res.redirect('/books');

    });

    return adminRouter;

}

module.exports = router;