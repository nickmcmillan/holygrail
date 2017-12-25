const express = require('express')
const router = express.Router()

const universalLoader = require('../universal')

router.get('/admin.css')

router.get('/', universalLoader)
module.exports = router
