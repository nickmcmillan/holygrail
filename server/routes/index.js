import express from 'express'
import universalLoader from '../universal'

const router = express.Router()


router.get('/admin.css') // requested by server/app.js

router.get('/', universalLoader)
module.exports = router
