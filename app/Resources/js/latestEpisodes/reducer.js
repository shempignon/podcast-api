import { LATEST_EPISODES_FETCH, LATEST_EPISODES_FETCH_FULFILLED, LATEST_EPISODES_FETCH_REJECTED } from './actions'

const initialState = {
  episodes: [],
  status: ''
}

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case LATEST_EPISODES_FETCH:
      return {
        ...state,
        status: 'Getting latest episodes'
      }
    case LATEST_EPISODES_FETCH_FULFILLED:
      return {
        ...state,
        episodes: payload
      }
    case LATEST_EPISODES_FETCH_REJECTED:
      return {
        ...state,
        status: `errored: ${payload}`
      }
    default:
      return state
  }
}
