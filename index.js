const express = require('express');
//for reading and writing cookies in the browser
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//used to store session data to the db
const MongoStore = require('connect-mongo')(session);


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name:'codial',
    //TODO : change secret before deployement in production
    secret:'blahhsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100),
    },
    store: new MongoStore({
        mongooseConnection : db,
        autoRemove:'disabled'
    },function(err){
        console.log(err || 'Mongo Store setup Successful');
    }),
}));
app.use(passport.initialize());
app.use(passport.session());

//sharing req.user
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
