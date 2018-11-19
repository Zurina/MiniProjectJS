var express = require('express');
var apiRouter = express.Router();
var userRouter = require('./users')
var positionRouter = require('./positions')
var locationblogRouter = require('./locationblogs')
var loginRouter = require('./login')
var geoapiRouter = require('./geoapi')

apiRouter.use('/users', userRouter)
apiRouter.use('/positions', positionRouter)
apiRouter.use('/locationblogs', locationblogRouter)
apiRouter.use('/login', loginRouter)
apiRouter.use('/geoapi', geoapiRouter)

module.exports = apiRouter