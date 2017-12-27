import keystone from 'keystone'

import {render, renderHead} from './serverRender'
import configureStore from '../src/store'

const path = require('path')
const fs = require('fs')

const api = require('./api')


module.exports = function universalLoader(req, res, next) {
    const filePath = path.resolve(__dirname, '..', 'build', 'index.html')
    
    // the admin route. let it be.
    if (req.path.includes('/keystone')) return next()
    if (req.path.includes('.')) return next() // so like admin.css or anthing with a file extension
    
    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('read err', err)
            return res.status(404).end()
        }
        
        serverRender(req, res, htmlData)
        .catch(err => {
            console.error('Render Error', err)
            return res.status(500).json({message: 'Render Error'})
        })
    })
}

// this does most of the heavy lifting
async function serverRender(req, res, htmlData) {
    const context = {data: {}, head: [], req, api}
    
    const contentPages = await keystone.list('Page').model.find({
        state: 'published'
    }).populate('secondLevelPages')
        
    // const posts = await keystone.list('Post').model.find({
    //     state: 'published'
    // }).populate('categories') // this gets the relationship data
    
    let reduxStoreValues = {
        contentPages: contentPages || {},
        //posts: posts || {},
    }
    
    const store = configureStore(reduxStoreValues)
    // first
    render(req, store, context)
    
    if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        res.redirect(301, context.url)
    }
    
    // handle our data fetching
    // TODO: work out what this does??
    const keys = Object.keys(context.data)
    const promises = keys.map(k=>context.data[k])
    const resolved = await Promise.all(promises)
    resolved.forEach((r,i)=>context.data[keys[i]]=r)
    
    //second
    const markup = render(req, store, context)
    const headMarkup = renderHead(context)
    
    if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        res.redirect(301, context.url)
    } else {
        // we're good, add in markup, send the response
        const RenderedApp = htmlData
            //.replace('<meta-head/>', headMarkup)
            .replace('{{SSR}}', markup)
            .replace('{{data}}', new Buffer(JSON.stringify(reduxStoreValues)).toString('base64'))
        if (context.code) {
            res.status(context.code)
        }
        res.send(RenderedApp)
    }
}
