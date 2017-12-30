/*
 * Use this route to update the window.INITIAL_STATE variable within public/index.html
 * It's useful for ensuring that Redux is up to date with the Keystone db
 */

import keystone from 'keystone'
import path from 'path'
import fs from 'fs'

import render from './render' // renderHead
import configureStore from '../src/store'

export default (req, res, next) => {
  // note that we're reading 'public' here, which is the source HTML for CRA.
  // by modifying the window.INITIAL_STATE within this file we are changing the data that CRA will boot with
  // and which will then be ingested by Redux
  const filePath = path.resolve(__dirname, '..', 'public', 'index.html')

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }

    modifyHTML(res, htmlData, filePath).catch(err => {
      console.error('Render Error', err)
      return res.status(500).json({ message: 'Render Error' })
    })
  })
}

// this does most of the heavy lifting
async function modifyHTML(res, htmlData, filePath) {

  // fetch all the Page data from keystone
  const contentPages = await keystone
    .list('Page')
    .model.find({
      state: 'published',
    })
    .populate(['secondLevelPages', 'author'])

  let reduxStoreValues = {
    contentPages: contentPages || {},
    //posts: posts || {},
  }

  const store = configureStore(reduxStoreValues)

  // just gonna replace the DATA object on the window so the CRA can just pick it up fresh
  const RenderedApp = htmlData
    .replace(/window.INITIAL_STATE = ".*"/,
    `window.INITIAL_STATE = "${Buffer.from(JSON.stringify(reduxStoreValues)).toString('base64')}"`
  )

  fs.writeFile(filePath, RenderedApp, (err) => {
    if(err) console.log(err)
  })

  res.status(200).json({ updated: reduxStoreValues })
}
