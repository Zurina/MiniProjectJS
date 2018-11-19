var LocationBlog = require('../models/locationblog')
var userFacade = require('./userFacade')

function addLocationBlog(locationBlogDetails) {
    return new LocationBlog(locationBlogDetails).save()
}

async function likeLocationBlog(username, blogInfo) {
    const user = await userFacade.findByUserName(username)
    return LocationBlog.findOne({ 'info': blogInfo}, function (err, locationBlog){
        locationBlog.likedBy.push(user._id)
        return locationBlog.save()
    });
}

async function likeLocationBlogByID(username, blogID) {
    const user = await userFacade.findByUserName(username)
    return LocationBlog.findOne({ '_id': blogID}, function (err, locationBlog){
        locationBlog.likedBy.push(user._id)
        return locationBlog.save()
    });
}

function getAllLocationBlogs() {
    return LocationBlog.find({})
}

function getSpecificLocationBlog(info) {
    return LocationBlog.findOne({ 'info': info}, function (err, locationBlog){
        return locationBlog
    });
}

function deleteLocationBlog(info) {
    return LocationBlog.deleteOne({'info': info})
}

function getLocationBlogByID(id) {
    return LocationBlog.findOne({'_id': id})
}

module.exports = {
    addLocationBlog,
    likeLocationBlog,
    likeLocationBlogByID,
    getAllLocationBlogs,
    getSpecificLocationBlog,
    deleteLocationBlog,
    getLocationBlogByID
}