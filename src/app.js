require('dotenv').config();
const express = require('express');
const path = require('path');
var session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo').default;
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 3000;


//db config
let connection = require('./db/conn');
const User = require('./models/user');


//Global middleware
app.use((req,res,next) => {
  res.locals.user=req.user;
  next();
});


//session store
const mongostore = new MongoStore({
    mongoUrl: process.env.DB_URL,
    collectionName: 'sessions'
})

//session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: mongostore,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

//passport config
const passportInit = require('../config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

//config flash
app.use(flash());

//config body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


//template engine config
app.set('view engine', 'ejs');

//static file config
const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path));

//router config
const routers = require('../router/homeRouter');
app.use(routers);





app.listen(PORT, () => {
    console.log(`server running on port number ${PORT}`);
});