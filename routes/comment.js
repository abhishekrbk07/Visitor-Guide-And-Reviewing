var express    = require("express"),
    campground = require("../models/campgroundmodel"),
    middleware = require("../middleware")
    Comment    = require("../models/commentmodel"),
    router     = express.Router();

router.get("/campgrounds/:id/comments/new" ,middleware.isLoggedIn, function(req , res){
    campground.findById(req.params.id,function(err , campgrounds){
        res.render("comments/new",{campgrounds:campgrounds});
    })
})

router.post("/campgrounds/:id/comments" , function(req , res){
    campground.findById(req.params.id , function(err , campground){
        if(err){
            console.log(err)
            res.render("/campgrounds/show")
        }else{
            Comment.create(req.body.comment , function(err,comment){
                if(err){
                    console.log(err)
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.date = Date(Date.now()).toString().slice(0,15);
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
})

//comment update and destroy 
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkcommentownership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundcomment){
        res.render("comments/edit",{campground_id:req.params.id , comment:foundcomment})
    })
})

router.put("/campgrounds/:id/comments/:comment_id" ,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment , function(err,updatedcomment){
        if(err){
            console.log(err)
        }else{
            req.flash("success" , "successfully editted your comment")
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
})

router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkcommentownership, function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id , function(err,Deletedcampground){
        if(err){
            console.log(err)
        }else{
            req.flash("success" , "Successfully deleted your comment")
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
})



module.exports = router;
