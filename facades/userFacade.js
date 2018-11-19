var User = require("../models/user").user
var Job = require("../models/user").job

function addUser(userDetails) {
    const user = new User(userDetails)
    return user.save()
}

function addJobToUser(username, job) {
    return User.findOne({ 'username': username}, function (err, user){
        const newJob = new Job(job)
        user.jobs.push(newJob)
        return user.save()
    });
}

function getAllUsers() {
    return User.find({})
}

function findByUserName(username) {
    return User.findOne({ 'username': username}, function (user){
        if (user == null) {
            return 'User could not be found' // TODO DOESNT WORK
        }
        return user
    });
}

function findByID(id) {
    return User.findOne({ '_id': id}, function (user){
        if (user == null) {
            return 'User could not be found' // TODO DOESNT WORK
        }
        return user
    });
}

function deleteUser(username) {
    return User.deleteOne({'username': username})
}

module.exports = {
    addUser,
    addJobToUser,
    getAllUsers,
    findByUserName,
    deleteUser,
    findByID
}