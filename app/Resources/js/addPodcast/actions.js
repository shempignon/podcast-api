// Key
export const key = 'addpodcast'

// Action types
export const PODCAST_FIELD_UPDATED = 'PODCAST_FIELD_UPDATED'
export const PODCAST_FIELD_INVALID = 'PODCAST_FIELD_INVALID'
export const ADD_PODCAST = 'ADD_PODCAST'
export const ADD_PODCAST_SUCCESS = 'ADD_PODCAST_SUCCESS'
export const ADD_PODCAST_FAILTURE = 'ADD_PODCAST_FAILTURE'

export const actionTypes = {
  PODCAST_FIELD_UPDATED,
  PODCAST_FIELD_INVALID,
  ADD_PODCAST,
  ADD_PODCAST_SUCCESS,
  ADD_PODCAST_FAILTURE
}

// Action creators

export const podcastFieldUpdated = e => ({
  type: PODCAST_FIELD_UPDATED,
  payload: {
    name: e.target.name || e.target.id,
    value: e.target.value
  }
})
export const podcastFieldInvalid = (errors, fieldUpdate) => ({
  type: PODCAST_FIELD_INVALID,
  payload: {
    errors,
    fieldUpdate
  }
})
export const addPodcast = e => {
  e.preventDefault()

  return { type: ADD_PODCAST }
}
export const addPodcastSuccess = podcast => ({
  type: ADD_PODCAST_SUCCESS,
  payload: podcast
})
export const addPodcastFailure = err => ({
  type: ADD_PODCAST_FAILTURE,
  payload: err,
  error: true
})

export const actions = {
  podcastFieldUpdated,
  podcastFieldInvalid,
  addPodcast,
  addPodcastSuccess,
  addPodcastFailure
}
