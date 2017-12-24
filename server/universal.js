const path = require('path')
const fs = require('fs')

import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'

import createRoutes from '../src/routes'
import configureStore from '../src/store'
import {Provider} from 'react-redux'
var keystone = require('keystone');

const routes = createRoutes({})

module.exports = function universalLoader(req, res, next) {
    //res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
    const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

    if (req.path.includes('/keystone')) return next()

    fs.readFile(filePath, 'utf8', (err, htmlData)=>{
        if (err) {
            console.error('read err', err)
            return res.status(404).end()
        }
        match({ routes, location: req.url }, (err, redirect, renderProps) => {
            if(err) {
                console.error('match err', err)
                return res.status(404).end()
            } else if(redirect) {
                res.redirect(302, redirect.pathname + redirect.search)
            } else if (renderProps) {

                const q = keystone.list('Page').model.findOne({
                    state: 'published',
                    slug: req.path.replace(/^\/|\/$/g, '') // match the slug from the db to the url
                })

                q.exec((err, result) => {

                    let store = configureStore({
                        pageData: result || {}
                    })

                    const ReactApp = renderToString(
                        <Provider store={store}>
                            <RouterContext {...renderProps} />
                        </Provider>
                    )
                    const RenderedApp = htmlData.replace('{{SSR}}', ReactApp)
                    res.send(RenderedApp)
                });

            } else {
                return res.status(404).end()
            }
        })
    })
}
