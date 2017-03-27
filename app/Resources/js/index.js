import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import routes from './routes'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const render = (Component) => {
  ReactDOM.render(
      <AppContainer>
        <Component/>
      </AppContainer>,
      document.getElementById('root')
    )
}

render(routes)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes', () => {
    render(routes)
  })
}
