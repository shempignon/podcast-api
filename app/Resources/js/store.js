import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogicMiddleware } from 'redux-logic'
import { podcasts, initialState } from './reducers'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { logics, deps} from './logics'

const logicMiddleware = createLogicMiddleware(logics, deps)

export const store = createStore(
    combineReducers({
        podcasts,
        routing: routerReducer
    }),
    applyMiddleware(logicMiddleware)
)

export const history = syncHistoryWithStore(browserHistory, store)