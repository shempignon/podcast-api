import { createLogic } from 'redux-logic'
import {
  PODCAST_SELECT,
  PODCAST_REFRESH,
  PODCAST_REFRESH_CURRENT,
  fetchRejected,
  fetchFulfilled,
  refreshPodcast,
  selectPodcast,
  key
} from './actions'
import { sendNotification, updateTitle } from '../layout/actions'

const podcastFetchLogic = createLogic({
  type: PODCAST_SELECT,
  debounce: 500,
  latest: true,

  validate ({ getState, action }, allow, reject) {
    if (action.slug) {
      allow(action)
    } else {
      reject()
    }
  },

  process ({ httpClient, getState, action }, dispatch, done) {
    httpClient.get(`/api/feeds/${action.slug}`)
      .then(resp => resp.data)
      .then(results => {
        if (!results.episodes.length) {
          dispatch(refreshPodcast(action.slug))
        } else {
          dispatch(fetchFulfilled(results))
          dispatch(updateTitle(results.name))
        }
      })
      .catch(err => {
        console.error(err)
        dispatch(fetchRejected(err))
      })
      .then(() => done())
  }
})

const podcastRefreshLogic = createLogic({
  type: PODCAST_REFRESH,
  debounce: 500,
  latest: true,

  validate ({ getState, action }, allow, reject) {
    if (action.slug) {
      allow(action)
    } else {
      reject()
    }
  },

  process ({ httpClient, getState, action }, dispatch, done) {
    httpClient.get(`/api/feeds/${action.slug}/refresh`)
      .then(resp => resp.data)
      .then(results => {
        dispatch(sendNotification(`${results} new episodes found`))
        dispatch(selectPodcast(action.slug))
      })
      .catch(err => {
        console.error(err)
        dispatch(fetchRejected(err))
      })
      .then(() => done())
  }
})

const podcastRefreshCurrentLogic = createLogic({
  type: PODCAST_REFRESH_CURRENT,

  process ({ httpClient, getState, action }, dispatch, done) {
    dispatch(refreshPodcast(getState()[key].podcast.slug))
    done()
  }
})

export default [
  podcastFetchLogic,
  podcastRefreshLogic,
  podcastRefreshCurrentLogic
]
