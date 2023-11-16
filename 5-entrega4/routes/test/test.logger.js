const { Router } = require('express')
const TestController = require('../../controllers/test.controller')

const router = Router() 

router.get('/logger', TestController.logger)

module.exports = router
