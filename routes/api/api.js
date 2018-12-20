var express = require('express');
var apiRouter = express.Router();
var userRouter = require('./users')
var positionRouter = require('./positions')
var locationblogRouter = require('./locationblogs')
var loginRouter = require('./login')
var geoapiRouter = require('./geoapi')
var graphqlRouter = require('./graphqll')
var graphiqlRouter = require('./graphiql')

apiRouter.use('/users', userRouter)
apiRouter.use('/positions', positionRouter)
apiRouter.use('/locationblogs', locationblogRouter)
apiRouter.use('/login', loginRouter)
apiRouter.use('/geoapi', geoapiRouter)
apiRouter.use('/graphql', graphqlRouter)
apiRouter.use('/graphiql', graphiqlRouter)

module.exports = apiRouter