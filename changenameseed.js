var mongoose = require("mongoose");
var campground = require("./models/campgroundmodel.js");
var Comment = require("./models/commentmodel.js");

//sample data as the seeds for comments
data = [
    {
        name: "mount rainer",
        image: "https://www.nps.gov/lavo/planyourvisit/images/southwest-campground_6081614_2.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos laboriosam ratione quo, accusamus quam id possimus in voluptate voluptatibus similique? At necessitatibus facilis accusantium blanditiis sed tenetur nam magnam doloremque similique possimus ipsum, beatae fugiat maxime rem repudiandae aperiam ducimus commodi maiores assumenda. Est facere beatae et libero nam velit aliquam laudantium, aut inventore ullam, quis non? Explicabo, ratione officia nemo similique dolores quasi inventore ipsum consequatur voluptates placeat autem dolore laboriosam eius, blanditiis, vero ea corrupti. Tempore eligendi numquam molestiae necessitatibus? Eum laboriosam deserunt aperiam numquam, ad facilis, quos suscipit itaque veniam nihil nisi porro temporibus a, molestiae placeat.",
    },
    {
        name: "lake lakey",
        image: "https://www.oregonlive.com/resizer/0FVk7bpZHdb--Lw10Y-443t0ylM=/450x0/smart/arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/DUNWFNGOAVCRLAHO4ZPTBKNJEM.jpg",
        description: "    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos laboriosam ratione quo, accusamus quam id possimus in voluptate voluptatibus similique? At necessitatibus facilis accusantium blanditiis sed tenetur nam magnam doloremque similique possimus ipsum, beatae fugiat maxime rem repudiandae aperiam ducimus commodi maiores assumenda. Est facere beatae et libero nam velit aliquam laudantium, aut inventore ullam, quis non? Explicabo, ratione officia nemo similique dolores quasi inventore ipsum consequatur voluptates placeat autem dolore laboriosam eius, blanditiis, vero ea corrupti. Tempore eligendi numquam molestiae necessitatibus? Eum laboriosam deserunt aperiam numquam, ad facilis, quos suscipit itaque veniam nihil nisi porro temporibus a, molestiae placeat.",
    },
    {
        name: "Heaven steps",
        image: "https://media.kare11.com/assets/KARE/images/437173820/437173820_750x422.png",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos laboriosam ratione quo, accusamus quam id possimus in voluptate voluptatibus similique? At necessitatibus facilis accusantium blanditiis sed tenetur nam magnam doloremque similique possimus ipsum, beatae fugiat maxime rem repudiandae aperiam ducimus commodi maiores assumenda. Est facere beatae et libero nam velit aliquam laudantium, aut inventore ullam, quis non? Explicabo, ratione officia nemo similique dolores quasi inventore ipsum consequatur voluptates placeat autem dolore laboriosam eius, blanditiis, vero ea corrupti. Tempore eligendi numquam molestiae necessitatibus? Eum laboriosam deserunt aperiam numquam, ad facilis, quos suscipit itaque veniam nihil nisi porro temporibus a, molestiae placeat.",
    }
]

function seedDB() {
    campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("all database is removed");
            data.forEach(function(seed){
                campground.create(seed,function(err,seedback){
                    if(err){
                        console.log(err)
                    }else{
                        console.log("database created");
                        Comment.create({
                            author:"homer",
                            text:"I wish there have to some internet good speed",
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            }else{
                                seedback.comments.push(comment);
                                seedback.save();
                                console.log("comments are alse added");
                            }
                        })
                    }
                })
            });
        }
    });
};

module.exports = seedDB;