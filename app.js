const express = require('express');
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport');
const app = new express();
const nav = [
    {
        link:'/home',name:'Home'

    },
    {
        link:'/books',name:'Books'
    },
    {
        link:'/authors',name:'Authors'
    },
    {
        link:'/admin',name:'Add Book'
    },
    {
        link:'/authoradmin',name:'Add Author'
    },
    {
        link:'/logout',name:'Logout'
    }
];

// Passport Config
require('./src/config/passport')(passport);


const homeRouter = require('./src/routes/homeRoutes')(nav);
const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorsRouter = require('./src/routes/authorRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authoradminRouter = require('./src/routes/authoradminRoutes')(nav);
const loginRouter = require('./src/routes/loginRoutes')();
const signupRouter = require('./src/routes/signupRoutes')();
const updatebookRouter = require('./src/routes/updatebkRoutes')(nav);
const updateauthorRouter = require('./src/routes/updateauthorRoutes')(nav);
const logoutRouter = require('./src/routes/logoutRoutes')();


app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');

// express session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());


// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.err_msg = req.flash('err_msg');
    next();
});



app.use('/home',homeRouter);
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.use('/admin',adminRouter);
app.use('/authoradmin',authoradminRouter);
app.use('/signup',signupRouter);
app.use('/login',loginRouter);
app.use('/updatebook',updatebookRouter);
app.use('/updateauthor',updateauthorRouter);
app.use('/logout',logoutRouter);


app.get('/',function(req,res){
   res.render("index",
   {
       title:'Library'
   });
});

app.listen(5300);