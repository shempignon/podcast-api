import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { Podcasts } from './podcasts/index'
import { store, history } from './store'
import { Layout } from "./layout/index"
import { Podcast } from "./podcast/index"

const routes = () => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Layout} >
                <IndexRoute component={Podcasts}/>
                <Route path='/podcasts' component={Podcasts} />
                <Route path='/podcast/:slug' component={Podcast} />
            </Route>
        </Router>
    </Provider>
)

export default routes