require('dotenv').config()
const passport = require('passport');

var express                   = require('express'),
    reload                    = require("reload"),
    bodyParser                = require('body-parser'),
    mongoose                  = require('mongoose'),
    Comment                   = require("./models/commentmodel"),
    flash                     = require("connect-flash"),
    LocalStrategy             = require("passport-local"),
    methodOverride            = require("method-override"),
    passportLocalMongoose     = require("passport-local-mongoose"),
    User                      = require("./models/usermodel"),
    campground                = require("./models/campgroundmodel"),
    // seedDB                    = require('./seed'),
    app                       = express();

var campgroundRoutes    = require("./routes/campground")
    commentRoutes       = require("./routes/comment")
    authenticationRoutes= require("./routes/auth")

// mongoose.connect('mongodb://localhost:27017/sites', {useNewUrlParser : true , useUnifiedTopology : true});
mongoose.connect('mongodb+srv://sanskar:dharmendra@cluster0.arbtt.mongodb.net/siteview?retryWrites=true&w=majority', {useNewUrlParser : true , useUnifiedTopology : true});

// seedDB();
app.set('view engine' ,'ejs');
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"))
app.use(require("express-session")({
    secret:"my name is sanskar",
    saveUninitialized: false,
    resave: false
}));


//setting up passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success")
    next();
});


app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(authenticationRoutes);

app.listen(process.env.PORT ||'3000', function(err){
    if(err){
        console.log(err);
    }else{
        console.log("server started");
    }
});
// reload(app);