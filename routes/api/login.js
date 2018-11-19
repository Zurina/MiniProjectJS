const {Expo} = require('expo-server-sdk');
var express = require('express');
var loginRouter = express.Router();
var loginFacade = require('../../facades/loginFacade')

loginRouter.post('/', async function (req, res, next) { 
    const {username, password, longitude, latitude, distance} = req.body
    const response  = await loginFacade.login(username, password, longitude, latitude, distance) 
    return res.json(response)
});

// FOR NOTIFICATIONS

const users = []

loginRouter.post("/notify", ((req, res) => {
    const newUser = req.body;
    console.log("User logged in: ",newUser.id);
    const index = users.findIndex(u => u.id === newUser.id);
    if (index >= 0) {  //Remove user if he already exists
      users.splice(index, 1);
    }
    if (users.length > 0) {
      notifyUsers(users, newUser);
    }
    users.push(newUser);
    res.json(newUser);
  }))

async function notifyUsers(users, newUser) {
    let expo = new Expo();
    // Create the messages that you want to send to clients
    let messages = [];
    for (let user of users) {
      if (!Expo.isExpoPushToken(user.pushToken)) {
        console.error(`Push token ${user.pushToken} is not a valid Expo push token`);
        continue;
      }
      messages.push({
        to: user.pushToken,
        sound: 'default',
        body: 'new User logged in',
        data: newUser,
      })
    }
    console.log("messages to send",messages.length)
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
  
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log("Ticket: ",ticketChunk)
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    };
  }

module.exports = loginRouter;

