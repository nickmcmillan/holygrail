import express from 'express'
import universalLoader from '../universal'
import updateData from '../updateData'

const router = express.Router()

router.get('/', universalLoader)
router.get('/admin.css') // requested by server/app.js
router.get('/updateData', updateData)

module.exports = router
