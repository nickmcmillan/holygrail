require('dotenv').config()
//require('babel-register')({ ignore: /\/(build|node_modules)\//, presets: ['react-app'] })

import 'ignore-styles' // tell node to be cool about when it finds css files.

import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'
import keystone from 'keystone'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 3000

const app = express()


keystone.init({
    'name': 'Admin3', // The name of the KeystoneJS application
    'brand': 'Holy grail3', // Displayed in the top left hand corner of the Admin UI

    'favicon': '../public/favicons/favicon.ico',
    'static': ['public'],
    'auto update': true,

    'cors allow origin': true,
    'cors allow methods': 'GET,OPTIONS,POST',
    //'session': false, //
    'cookie secret': process.env.COOKIE_SECRET,
    'session store': 'mongo',
    'auth': true,
    'user model': 'User', // obviously must match the name set up in the models
    'trust proxy': true,
    //'sass': 'public',

    'compress': true,
    //'wysiwyg additional plugins': 'paste',
    // 'wysiwyg additional options': {
    //     content_css: '../build/admin.css'
    //     //'paste_data_images': true,
    //     //'image_list' : '/images',
    // },
    //'wysiwyg images': true,
    'wysiwyg cloudinary images': true,
    'wysiwyg importcss': '/admin.css',  // make sure our server/routes allows us to get this file
})

keystone.set('cloudinary config', {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});


if (process.env.MONGODB) {
    keystone.set('mongo', process.env.MONGODB) // The url for your MongoDB connection
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

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
    pages: ['pages', 'PageSecondLevel'], // adding pages to Admin UI nav
    posts: ['posts', 'PostCategory'],
    galleries: 'galleries',
    enquiries: 'enquiries',
    users: 'users',
})



keystone.set('app', app)

module.exports = keystone
