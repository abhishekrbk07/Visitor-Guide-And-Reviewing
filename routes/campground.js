var express    = require("express"),
    router     = express.Router(),
    middleware = require("../middleware"),
    campground = require("../models/campgroundmodel");
    var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

router.get("/" , function(req,res){
    res.render('landing');
});

router.get("/campgrounds", function(req,res) {
    campground.find({} , function(err, campdata){
        if(err){
            console.log(err);
        }else
        res.render('campgrounds/index', {campgrounds:campdata});
    });
})

router.post('/campgrounds',middleware.isLoggedIn ,function(req,res) {
    req.body.newcampgrounds.author = {
        id:req.user._id,
        username:req.user.username,
    }
    // geocoder.geocode(req.body.location, function (err, data) {
    //     if (err || !data.length) {
    //       req.flash('error', 'Invalid address');
    //       return res.redirect('back');
    //     }
    //     var lat = data[0].latitude;
    //     var lng = data[0].longitude;
    //     var location = data[0].formattedAddress;
    campground.create(req.body.newcampgrounds, function(err , campdata){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds")
        }
    });
});
// });

router.get('/campgrounds/new',middleware.isLoggedIn,function(req , res){
    res.render('campgrounds/new');
});

router.get('/campgrounds/:id', function(req , res){
    campground.findById(req.params.id).populate("comments").exec(function(err , datafound){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show" , {campground:datafound});
        };
    });
});

//Edit route
router.get("/campgrounds/:id/edit",middleware.checkcampgroundownership,function(req,res){
        campground.findById(req.params.id , function(err,foundCampground){
             res.render("campgrounds/edit",{campground:foundCampground})
    })
})

router.put("/campgrounds/:id",middleware.checkcampgroundownership,function(req,res){
    // geocoder.geocode(req.body.location, function (err, data) {
    //     if (err || !data.length) {
    //       req.flash('error', 'Invalid address');
    //       return res.redirect('back');
    //     }
    //     req.body.campground.lat = data[0].latitude;
    //     req.body.campground.lng = data[0].longitude;
    //     req.body.campground.location = data[0].formattedAddress;
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatesCampground){
        if(err){
            console.log(err)
        }else{
            res.redirect('/campgrounds/' + req.params.id)
        }
    })
})
// })

router.delete("/campgrounds/:id" ,middleware.checkcampgroundownership, function(req,res){
    campground.findByIdAndRemove(req.params.id,function(err,deletedcampground){
        if(err){
            res.redirect("/campgrounds")
        }else{
            req.flash("success" , "Successfully deleted")
            res.redirect("/campgrounds")
        }
    })
})

module.exports = router;