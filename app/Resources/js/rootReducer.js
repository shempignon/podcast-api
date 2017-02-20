import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { key as podcastsKey, reducer as podcastsReducer } from './podcasts/index'
import { key as podcastKey, reducer as podcastReducer } from './podcast/index'

export default combineReducers({
    [podcastsKey]: podcastsReducer,
    [podcastKey]: podcastReducer,
    routing: routerReducer
})