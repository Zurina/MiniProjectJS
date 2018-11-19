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
async function createFriends(){
    await User.deleteMany({});
    await Position.deleteMany({});
    await LocationBlog.deleteMany({});
    console.log("ALL DATA CLEARED")
    
    const userPromises = [
        userCreate("Harry", "Potter", "ChosenOne", "HÆHÆ", "H@H.dk", "DIRECTOR", "BIGSEAN", "BIGSEAN.dk"),
        userCreate("Ron", "Weasley", "Gizmaker", "HÆHÆ", "H@H.dk", "DIRECTOR", "BIGSEAN", "BIGSEAN.dk"),
        userCreate("Hermione", "Granger", "Smart", "HÆHÆ", "H@H.dk", "DIRECTOR", "BIGSEAN", "BIGSEAN.dk"),
        userCreate("Albus", "Dumbledore", "Genius", "HÆHÆ", "H@H.dk", "DIRECTOR", "BIGSEAN", "BIGSEAN.dk"),
        userCreate("Remus", "Lupin", "Wearwolf", "HÆHÆ", "H@H.dk", "DIRECTOR", "BIGSEAN", "BIGSEAN.dk"),
        userCreate("Sirius", "Black", "Dog", "HÆHÆ", "H@H.dk", "DIRECTOR", "BIGSEAN", "BIGSEAN.dk"),
    ]

    var users = await Promise.all(userPromises);
    console.log("TEST DB: users added")

    var positionPromises =  [
        positionCreator(12.568101882934569, 55.70153288107985, users[0]._id, false),
        positionCreator(12.565956115722656, 55.699791668749924, users[1]._id, false),
        positionCreator(12.570161819458006, 55.69998514061735, users[2]._id, false),
        positionCreator(12.55411148071289, 55.7010975852698, users[3]._id, false),
        positionCreator(12.537546157836914, 55.70085575216929, users[4]._id, false),
        positionCreator(12.520809173583984, 55.7006139175724, users[5]._id, false),
    ]
    var posisitons = await Promise.all(positionPromises)
    console.log("TEST DB: positions added")

    const locationblogPromises = [
        LocationBlogCreator("Hello, I'm very goooooood", 13, 17, users[0]._id, []),
        LocationBlogCreator("Hello, I'm very goooooood1", 13, 17, users[0]._id, [users[0]._id]),
        LocationBlogCreator("Hello, I'm very goooooood11111", 14, 15, users[2]._id, [users[3]._id]),
    ]
    const locationblogs = await Promise.all(locationblogPromises)
    console.log("TEST DB: locationsblogs added")

    return {
        users: users,
        positions: posisitons,
    }
}

module.exports = createFriends

