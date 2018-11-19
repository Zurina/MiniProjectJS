var Position = require("../models/position")
var userFacade = require('./userFacade')

function addPosition(positionDetails) {
    new Position(positionDetails).save()
}

async function deletePosition(username) { // username or id of user??
    const user = await userFacade.findByUserName(username)
    return Position.deleteOne({'user': user._id})
}

async function updatePosition(username, coordinates) { 
    const user = await userFacade.findByUserName(username)
    return Position.findOne({ 'user': user._id}, function (err, position){
        position.loc.coordinates = coordinates
        return position.save()
    });
}

async function updatePositionByUserId(id, coordinates) { 
    return Position.findOne({ 'user': id}, function (err, position){
        position.loc.coordinates = coordinates
        return position.save()
    });
}

async function findPosition(username) {
    const user = await userFacade.findByUserName(username)
    return Position.findOne({'user': user._id})
}

async function findPositionByUserId(id) {
    return Position.findOne({'user': id})
}

function findAllPositions() {
    return Position.find({})
}

module.exports = {
    addPosition,
    deletePosition,
    updatePosition,
    findAllPositions,
    findPosition,
    findPositionByUserId,
    updatePositionByUserId
}