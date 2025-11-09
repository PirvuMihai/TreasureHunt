let router          = require('express').Router()
let user_controller = require('../controller/user') 

router.get('/login', user_controller.login)
router.get('/register', user_controller.register)

module.exports = router