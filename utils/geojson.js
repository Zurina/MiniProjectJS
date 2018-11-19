const gju = require('geojson-utils')
const userFacade = require('../facades/userFacade')
const gameArea = require('../game/gameArea')

async function findNearbyPlayers(longitude, latitude, distance, positions) {
    const center = {coordinates: [longitude, latitude]}
    const nearbyPositions = positions.filter(pos => gju.geometryWithinRadius(pos.loc, center, distance))
    const nearbyUsers = await Promise.all(nearbyPositions.map(async (pos) => {
        const user = await userFacade.findByID(pos.user)
        const other = {
            "type": "Point",
            coordinates: [pos.loc.coordinates[0], pos.loc.coordinates[1]]
        }
        const distance = findDistanceToUser(longitude, latitude, other)
        return {
            username: user.username,
            distance: distance,
            longitude: pos.loc.coordinates[0],
            latitude: pos.loc.coordinates[1]
        }
    }))
    return {friends: nearbyUsers}
}

function isUserInArea(lon, lat) {
    const player = {
        "type": "Point",
        coordinates: [lon,lat]
    }
    return gju.pointInPolygon(player, gameArea) 
  }

function findDistanceToUser(lon, lat, user) {
    const caller = {
        "type": "Point",
        coordinates: [lon,lat]
    }
    return gju.pointDistance(caller, user)
}

module.exports = {
    findNearbyPlayers,
    isUserInArea,
    findDistanceToUser
}