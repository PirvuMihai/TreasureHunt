let router = require('express').Router()

let user_router = require('./user')

router.use('/user', user_router)

module.exports = router