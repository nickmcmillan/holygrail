import React from 'react'
import { renderToString } from 'react-dom/server' // renderToStaticMarkup
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import App from '../src/containers/App'

export default (req, store, context) => {
  return renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App/>
      </StaticRouter>
    </Provider>
  )
}

// export function renderHead(context) {
//   return context.head.map(h => (
//     renderToStaticMarkup(h)
//   )).join('')
// }
