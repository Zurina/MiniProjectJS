var User = require("../models/user.js").user;
var LocationBlog = require("../models/locationblog.js");
var Position = require("../models/position.js");

//Utility Function to create users
function userCreate(firstname,lastname,username,password,email,type,company,companyUrl){
    const jobs = [{type, company, companyUrl}]
    const user = new User({firstname,lastname,username,password,email, jobs})
    return user.save()
}
//Utility Function to create Positions
function positionCreator(lon,lat,userId,dateInFuture){
    var posDetail = { user : userId, loc:{coordinates:[lon,lat] } };
    if(dateInFuture){
      posDetail.created = "2022-09-25T20:40:21.899Z";
    }
    var position = new Position(posDetail);
    return position.save();
}

//Utility Function to create LocationBlogs
function LocationBlogCreator(info, longitude, latitude, author, likedBy) {
    var locationDetail = { info, pos: { longitude, latitude}, author, likedBy }
    var locationblog = new LocationBlog(locationDetail)
    return locationblog.save()
}

// Here we will setup users and other schemas
async function createUsers(){
    await User.deleteMany({});
    await Position.deleteMany({});
    await LocationBlog.deleteMany({});
    console.log("ALL DATA CLEARED")
    
    const userPromises = [
        userCreate("Mathæus", "Biggles", "Immassive1", "HÆHÆ", "H@H.dk", "DIRECTOR", "BIGSEAN", "BIGSEAN.dk"),
        userCreate("SIRIUS", "Biggles", "Immassive4", "HÆHÆ", "H@H.dk", "DIRECTOR", "BIGSEAN", "BIGSEAN.dk"),
    ]

    var users = await Promise.all(userPromises);
    console.log("TEST DB: users added")

    var positionPromises =  [
        positionCreator(10, 11, users[0]._id, false),
        positionCreator(11, 12, users[1]._id, false),
    ]
    var posisitons = await Promise.all(positionPromises)
    console.log("TEST DB: positions added")

    const locationblogPromises = [
        LocationBlogCreator("Hello, I'm very goooooood", 13, 17, users[0]._id, []),
        LocationBlogCreator("Hello, I'm very goooooood1", 13, 17, users[0]._id, [users[0]._id]),
    ]
    const locationblogs = await Promise.all(locationblogPromises)
    console.log("TEST DB: locationsblogs added")

    return {
        users: users,
        positions: posisitons,
        locationblogs: locationblogs
    }
}

module.exports = createUsers

