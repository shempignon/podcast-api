import { PODCASTS_FETCH, PODCASTS_FETCH_REJECTED, PODCASTS_FETCH_FULFILLED } from './actions'

const initialState = {
  list: [],
  status: ''
}

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case PODCASTS_FETCH:
      return {
        ...state,
        status: 'Loading podcasts...',
        list: []
      }
    case PODCASTS_FETCH_FULFILLED:
      return {
        ...state,
        list: payload,
        status: 'Loaded'
      }
    case PODCASTS_FETCH_REJECTED:
      return {
        ...state,
        status: `errored: ${payload}`
      }
    default:
      return state
  }
}
