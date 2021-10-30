const passport = require("passport");
var express = require("express"),
    router  = express.Router(),
    User    = require("../models/usermodel");

router.get("/register" , function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
    var newUser = new User({username:req.body.username}) ;
    User.register(newUser, req.body.password , function(err,response){
        if(err){
            req.flash("error", err.message)
            res.redirect("/register")
        }else{
            passport.authenticate("local")(req, res,function(){
                req.flash("success","Welcome to the SiteView "+ req.user.username)
                res.redirect("/campgrounds");
            })
        }
    })
})

//login handling
router.get("/login" , function(req,res){
    res.render("login")
});

router.post("/login", passport.authenticate("local",{
    successRedirect:"/campgrounds",
    successFlash:"Welcome to the SiteView again",
    failureRedirect:"/login",
    failureFlash:"Invalid Credentials"}),function(req,res){
});

router.get("/logout" , function(req ,res){
    req.logout();
    req.flash("success","Successfully logged you out")
    res.redirect("/")
});

//middleware for campgrouds


module.exports = router;