import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Store } from 'webext-redux'

import { createDomAnchor } from '../../scripts/dom'
import CounterApp from './containers/CounterApp'

createDomAnchor('counter-root')
const store = new Store()

store.ready().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <CounterApp />
    </Provider>,
    document.getElementById('counter-root'),
  )
})
