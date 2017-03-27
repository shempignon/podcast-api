import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { key as podcastsKey, reducer as podcastsReducer } from './podcasts'
import { key as podcastKey, reducer as podcastReducer } from './podcast'
import { key as latestEpisodesKey, reducer as latestEpisodesReducer } from './latestEpisodes'
import { key as addPodcastKey, reducer as addPodcastReducer } from './addPodcast'
import { key as playerKey, reducer as playerReducer } from './player'
import { key as layoutKey, reducer as layoutReducer } from './layout'

export default combineReducers({
  [podcastsKey]: podcastsReducer,
  [podcastKey]: podcastReducer,
  [latestEpisodesKey]: latestEpisodesReducer,
  [addPodcastKey]: addPodcastReducer,
  [playerKey]: playerReducer,
  [layoutKey]: layoutReducer,
  routing: routerReducer
})
