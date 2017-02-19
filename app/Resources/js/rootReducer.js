import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { key as podcastsKey, reducer as podcastsReducer } from './podcasts/index'

export default combineReducers({
    [podcastsKey]: podcastsReducer,
    routing: routerReducer
})