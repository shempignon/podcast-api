import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { Podcasts } from './components'
import { store, history } from './store'

const routes = () => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Podcasts} />
        </Router>
    </Provider>
)

export default routes