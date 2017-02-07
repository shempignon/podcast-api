import {
    PODCAST_FETCH,
    PODCAST_FETCH_FULFILLED,
    PODCAST_FETCH_REJECTED
} from './actions'

export const initialState = {
    list: [],
    status: ''
}

export const podcasts = (state = initialState, action)  => {
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