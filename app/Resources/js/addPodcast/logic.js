import { createLogic } from 'redux-logic'
import { buildParams } from '../utils'
import {
    ADD_PODCAST,
    PODCAST_FIELD_UPDATED,
    podcastFieldInvalid,
    addPodcastSuccess,
    addPodcastFailure
} from './actions'
import { fetchPodcasts } from '../podcasts/actions'
import { selectors as addPodcastSel } from './reducer'

export function validateFields (fields) {
  const errors = []
  if (!fields.url) {
    errors.push('Podcast URL is required')
  }

  return errors
}

const podcastUpdateValidationLogic = createLogic({
  type: PODCAST_FIELD_UPDATED,
  debounce: 500,

  validate ({ getState, action }, allow, reject) {
    const fields = addPodcastSel.fields(getState())
    const fieldUpdate = action.payload
    const updatedFields = {
      ...fields,
      [fieldUpdate.name]: fieldUpdate.value
    }
    const errors = validateFields(updatedFields)
    if (!errors.length) {
      allow(action)
    } else {
      reject(podcastFieldInvalid(errors, fieldUpdate))
    }
  }
})

const addPodcastLogic = createLogic({
  type: ADD_PODCAST,
  debounce: 500,
  latest: true,

  validate ({ getState, action }, allow, reject) {
    const fields = addPodcastSel.fields(getState())
    const errors = validateFields(fields)
    if (!errors.length) {
      allow(action)
    } else {
      reject()
    }
  },

    // use axios injected as httpClient from configureStore logic deps
  process ({ httpClient, getState }, dispatch, done) {
    const fields = addPodcastSel.fields(getState())
    httpClient.post('/api/feeds', buildParams(fields))
      .then(resp => resp.data)
      .then(results => {
        dispatch(addPodcastSuccess(results))
        dispatch(fetchPodcasts())
      })
      .catch(err => {
        console.error(err)
        dispatch(addPodcastFailure(err))
      })
      .then(() => done())
  }
})

export default [
  addPodcastLogic,
  podcastUpdateValidationLogic
]
