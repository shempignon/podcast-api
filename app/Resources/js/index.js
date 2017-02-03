import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import routes from './routes'

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('root')
    )
}

render(routes);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./routes', () => {
        render(routes)
    })
}