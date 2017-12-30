const express = require('express')
const router = express.Router()

const universalLoader = require('../universal')

router.get('/admin.css') // requested by server/app.js

router.get('/', universalLoader)
module.exports = router
