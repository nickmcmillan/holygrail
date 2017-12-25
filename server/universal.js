const path = require('path')
const fs = require('fs')

import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'

const promisify = require('es6-promisify')

import createRoutes from '../src/routes'
import configureStore from '../src/store'
import {Provider} from 'react-redux'

import keystone from 'keystone'

const routes = createRoutes({})

module.exports = function universalLoader(req, res, next) {
    //res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
    const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

    // the admin route. let it be.
    if (req.path.includes('/keystone')) return next()
    if (req.path.includes('/_next-prefetcher.js')) return next()
    if (req.path.includes('/admin.css')) return next()
    if (req.path.includes('favicon')) return next()

    fs.readFile(filePath, 'utf8', (err, htmlData)=>{
        if (err) {
            console.error('read err', err)
            return res.status(404).end()
        }
        match({ routes, location: req.url }, async (err, redirect, renderProps) => {
            if (err) {
                console.error('match err', err)
                return res.status(404).end()
            } else if(redirect) {
                res.redirect(302, redirect.pathname + redirect.search)
            } else if (renderProps) {

                // get data for all pages.
                const contentPages = await keystone.list('Page').model.find({
                    state: 'published'
                })

                let reduxStoreValues = {
                    contentPages: contentPages || {}
                }

                const store = configureStore(reduxStoreValues)

                const ReactApp = renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                )
                const RenderedApp = htmlData.replace('{{SSR}}', ReactApp)
                    .replace('{{data}}', new Buffer(JSON.stringify(reduxStoreValues)).toString('base64'))
                res.send(RenderedApp)


            } else {
                return res.status(404).end()
            }
        })
    })
}
