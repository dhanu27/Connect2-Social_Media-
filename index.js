const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8007;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passort-local-auth');
const MongoStore=require('connect-mongodb-session')(session);
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const custMiddleware=require('./config/middleware');
// const Noty = require('noty');
app.use(sassMiddleware({
    src:'./assests/scss',
    dest:'./assests/css',
    debug:true,
    outputStyle:'extended',
    prefix:"/css"

}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assests'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'connect',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);


app.use(flash());
app.use(custMiddleware.setFlash);
// use express router
app.use('/', require('./routes'));



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

