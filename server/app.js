require('ignore-styles')
require('babel-register')({ ignore: /\/(build|node_modules)\//, presets: ['react-app'] })

const bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const keystone = require('keystone')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001

const app = express()

keystone.init({
  'name': 'Ssr-testo',
  'brand': 'My Site',

  'favicon': '../public/favicons/favicon.ico',
  'static': ['public'],
  'auto update': true,
  
  'cors allow origin': true,
  'cors allow methods': 'GET,OPTIONS,POST',
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'ujf8wf983ufp9a83up98fu3apw938fuapw938fuap9w38ufap9w8ufp93aw8yfp9w83yfpaw98ym',
  'trust proxy': true,
  

  'sass': 'public',

});


keystone.set('cloudinary config', { 
    cloud_name: 'dzroyrypi',
    api_key: '168598223432289',
    api_secret: 'W6B7LicQcVFfKHqTkzibR12HV6E',
 });
 
 
if (process.env.MONGODB) {
	keystone.set('mongo', process.env.MONGODB)
}


if (process.env.HOST) {
	keystone.set('host', process.env.HOST)
}

if (process.env.PORT) {
	keystone.set('port', PORT)
}

if (process.env.SOCKET) {
	keystone.set('unix socket', process.env.SOCKET)
}

// Support Gzip
app.use(compression())

// Suport post requests with body data (doesn't support multipart, use multer)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Setup logger
app.use(morgan('combined'))

const index = require('./routes/index')
app.use('/', index)

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))

const api = require('./routes/api')
app.use('/api', api)

// Always return the main index.html, so react-router render the route in the client
const universalLoader = require('./universal')
app.use('/', universalLoader)

keystone.import('./models')



keystone.set('nav', {
	'users': ['User']
})

keystone.set('app', app)

module.exports = keystone
