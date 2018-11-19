const User = require('../models/user').user
const bcryptjs = require('bcryptjs')
const positionFacade = require('./positionFacade')
const blogFacade = require('./blogFacade')
const geojson = require('../utils/geojson')

async function login(username,password,longitude,latitude,distance) {
        const user = await User.findOne({'username': username}) // retrieving user, but doesnt update?
        if(!user || !bcryptjs.compare(password, user.password)) {
            return {msg: "wrong username or password", status: 403}
        }
        await positionFacade.updatePositionByUserId(user._id, [longitude, latitude]) // Updating the user's position
        // one way of finding players
            // const ps = await Position.find( 
        //     {
        //         loc:
        //         { $near :
        //             {
        //                 $geometry: { type: "Point",  coordinates: [ longitude, latitude ] },
        //                 $minDistance: 0,
        //                 $maxDistance: distance
        //             }
        //         }
        //     }
        // )
        // console.log(ps)

        // another way of finding nearby players
        const positions = await positionFacade.findAllPositions()
        return await geojson.findNearbyPlayers(longitude, latitude, distance, positions) 
}

async function loginWeb(username,password) {
    const user = await User.findOne({username}) // retrieving user, but doesnt update?
    if(!user || !bcryptjs.compare(password, user.password)) 
        return {msg: "wrong username or password", status: 403}
    const locationblogs = await blogFacade.getAllLocationBlogs()
    return {msg: "Login succesful", blogs: locationblogs, status: 200} 
}

module.exports = {
    login,
    loginWeb
}