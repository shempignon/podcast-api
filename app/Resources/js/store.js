import axios from 'axios'
import { compose, createStore, applyMiddleware } from 'redux'
import { createLogicMiddleware } from 'redux-logic'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import rootReducer from './rootReducer'
import rootLogic from './rootLogic'

const middleware = applyMiddleware(
  createLogicMiddleware(rootLogic, {httpClient: axios})
)

const enhancer = (typeof devToolsExtension !== 'undefined')
  ? compose(
    middleware,
    /* eslint-disable no-undef */
    devToolsExtension()
    /* eslint-enable no-undef */
  )
  : middleware

export const store = createStore(rootReducer, enhancer)

export const history = syncHistoryWithStore(browserHistory, store)
