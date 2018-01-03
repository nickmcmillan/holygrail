/*
 * Use this route to reset the window.INITIAL_STATE variable within public/index.html
 * Used as a precommit hook
 */

import path from 'path'
import fs from 'fs'

// note that we're reading 'public' here, which is the source HTML for CRA.
// by modifying the window.INITIAL_STATE within this file we are changing the data that CRA will boot with
// and which will then be ingested by Redux
const filePath = path.resolve(__dirname, '..', 'public', 'index.html')

fs.readFile(filePath, 'utf8', (err, htmlData) => {
  if (err) {
    console.error('read err', err)
    return res.status(404).end()
  }

  const RenderedApp = htmlData
    .replace(/window.INITIAL_STATE = ".*"/,
    'window.INITIAL_STATE = "{{data}}"'
  )

  fs.writeFile(filePath, RenderedApp, (err) => {
    if(err) console.log(err)
  })

})
