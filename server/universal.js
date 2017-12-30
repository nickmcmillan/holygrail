import keystone from 'keystone'
import path from 'path'
import fs from 'fs'

import render from './render' // renderHead
import configureStore from '../src/store'

export default (req, res, next) => {
    const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

    if (req.path.includes('/keystone')) return next() // the admin route. let it be.
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
    const context = {data: {}, req}

    // fetch all the Page data from keystone
    const contentPages = await keystone.list('Page').model.find({
        state: 'published'
    }).populate('secondLevelPages') // populate() gets the relationship data
    // TODO: also populate author

    // const posts = await keystone.list('Post').model.find({
    //     state: 'published'
    // }).populate('categories')

    // plug in the keystone db response into the redux store
    let reduxStoreValues = {
        contentPages: contentPages || {},
        //posts: posts || {},
    }

    const store = configureStore(reduxStoreValues)
    // // first
    // render(req, store, context)
    //
    // if (context.url) {
    //   console.log('!1', context.data);
    //
    //     // Somewhere a `<Redirect>` was rendered
    //     res.redirect(301, context.url)
    // }

    //second
    const markup = render(req, store, context)
    //const headMarkup = renderHead(context)

    if (context.url) {
      console.log('!2', context.data);
        // Somewhere a `<Redirect>` was rendered
        res.redirect(301, context.url)
    } else {
        // we're good, add in markup, send the response
        const RenderedApp = htmlData
            //.replace('<meta-head/>', headMarkup)
            .replace('{{SSR}}', markup)
            .replace('{{data}}', Buffer.from(JSON.stringify(reduxStoreValues)).toString('base64'))
        if (context.code) {
            res.status(context.code)
        }
        res.send(RenderedApp)
    }
}
