import { PODCAST_FETCH, PODCAST_FETCH_REJECTED, PODCAST_FETCH_FULFILLED } from './actions'

const initialState = {
    list: [],
    status: ''
}

export default function reducer(state = initialState, action){
    switch(action.type) {
        case PODCAST_FETCH:
            return {
                ...state,
                fetchStatus: `fetching for ${action.payload}... ${(new Date()).toLocaleString()}`,
                list: []
            };
        case PODCAST_FETCH_FULFILLED:
            return {
                ...state,
                list: action.payload,
                fetchStatus: `Results from ${(new Date()).toLocaleString()}`
            };
        case PODCAST_FETCH_REJECTED:
            return {
                ...state,
                fetchStatus: `errored: ${action.payload}`
            };
        default:
            return state;
    }
}