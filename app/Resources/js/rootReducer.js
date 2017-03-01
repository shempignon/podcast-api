import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { key as podcastsKey, reducer as podcastsReducer } from './podcasts/index'
import { key as layoutKey, reducer as layoutReducer } from './layout/index'
import { key as podcastKey, reducer as podcastReducer } from './podcast/index'
import { key as addPodcastKey, reducer as addPodcastReducer } from './addPodcast/index'

export default combineReducers({
    [podcastsKey]: podcastsReducer,
    [podcastKey]: podcastReducer,
    [addPodcastKey]: addPodcastReducer,
    [layoutKey]: layoutReducer,
    routing: routerReducer
})