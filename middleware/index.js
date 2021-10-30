var middlewareObj = {},
    campground = require("../models/campgroundmodel"),
    Comment    = require("../models/commentmodel");

//Authentication middleware
middlewareObj.isLoggedIn = function(req , res , next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in")
    res.redirect("/login")
}

middlewareObj.checkcampgroundownership = function(req,res,next){
    if(req.isAuthenticated()){
        campground.findById(req.params.id , function(err,foundCampground){
            if(err){
                console.log(err)
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                    return next()
                }else{
                    req.flash("error" , "You do not have permission to do that")
                    res.redirect("back")
                }
            }
        })
    }else{
        req.flash("error","You need to be logged in to do that")
        res.redirect("back")
    }
}

middlewareObj.checkcommentownership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id ,function(err,foundcomment){
            if(err){
                console.log(err)
            }else{
                if(foundcomment.author.id.equals(req.user._id)){
                    next()
                }else{
                    req.flash("You do not have permission to do that")
                    res.redirect("back")
                }
            }
        })
    }else{
        req.flash("error" , "You need to be logged in to do that")
        res.redirect("/login")
    }
}

module.exports = middlewareObj;