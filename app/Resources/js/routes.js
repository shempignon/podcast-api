import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRedirect } from 'react-router'
import { Podcasts } from './podcasts'
import { store, history } from './store'
import { Layout } from './layout'
import { Podcast } from './podcast'
import { LatestEpisodes } from './latestEpisodes'

const routes = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Layout} >
        <IndexRedirect to='/episodes/latest' />
        <Route path='/episodes/latest' component={LatestEpisodes} />
        <Route path='/podcasts' component={Podcasts} />
        <Route path='/podcast/:slug' component={Podcast} />
      </Route>
    </Router>
  </Provider>
)

export default routes
