import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import * as reducers from './reducers'
import { Podcasts } from './components'

// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    })
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const routes = () => (
    <MuiThemeProvider>
        <Paper zDepth={0}>
            <AppBar
                title="Podcast"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={Podcasts} />
                </Router>
            </Provider>
        </Paper>
    </MuiThemeProvider>
)

export default routes