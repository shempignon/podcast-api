import { PODCAST_SELECT, PODCAST_FETCH_FULFILLED, PODCAST_FETCH_REJECTED } from './actions'

const initialState = {
  status: '',
  podcast: {
    name: '',
    slug: '',
    updatedAt: '',
    episodes: []
  }
}

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case PODCAST_SELECT:
      return {
        ...state,
        status: `fetching for ${payload}...`
      }
    case PODCAST_FETCH_FULFILLED:
      return {
        ...state,
        podcast: payload
      }
    case PODCAST_FETCH_REJECTED:
      return {
        ...state,
        status: `errored: ${payload}`
      }
    default:
      return state
  }
}
