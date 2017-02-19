import axios from 'axios'
import { createStore, applyMiddleware } from 'redux'
import { createLogicMiddleware } from 'redux-logic'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import rootReducer from './rootReducer'
import rootLogic from './rootLogic'

export const store = createStore(
    rootReducer,
    applyMiddleware(
        createLogicMiddleware(rootLogic, {httpClient: axios})
    )
)

export const history = syncHistoryWithStore(browserHistory, store)