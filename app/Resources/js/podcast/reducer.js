import { PODCAST_SELECT, PODCAST_REFRESH, PODCAST_FETCH_FULFILLED, PODCAST_FETCH_REJECTED } from './actions'

const initialState = {
    status: '',
    podcast: {
        name: '',
        slug: '',
        updatedAt: '',
        episodes: []
    }
}

export default function reducer(state = initialState, action){
    switch(action.type) {
        case PODCAST_SELECT:
            return {
                ...state,
                status: `fetching for ${action.payload}...`
            }
        case PODCAST_REFRESH:
            return {
                ...state,
                status: `Refreshing ${action.name}...`
            }
        case PODCAST_FETCH_FULFILLED:
            return {
                ...state,
                podcast: action.payload
            }
        case PODCAST_FETCH_REJECTED:
            return {
                ...state,
                status: `errored: ${action.payload}`
            }
        default:
            return state
    }
}