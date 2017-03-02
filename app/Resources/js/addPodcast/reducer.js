import { key, ADD_PODCAST, ADD_PODCAST_SUCCESS, ADD_PODCAST_FAILTURE, UPDATE_PODCAST_FIELD } from './actions'

const initialState = {
    url: '',
    status: ''
}

export const selectors = {
    url: state => state[key].url,
    status: state => state[key].status
}

export default function reducer(state = initialState, action){
    switch(action.type) {
        case UPDATE_PODCAST_FIELD:
            return {
                ...state,
                url: action.url
            }
        case ADD_PODCAST:
            return {
                ...state,
                status: 'Loading podcasts...'
            }
        case ADD_PODCAST_SUCCESS:
            return {
                ...state,
                status: 'Loaded',
                url: ''
            }
        case ADD_PODCAST_FAILTURE:
            return {
                ...state,
                status: `errored: ${action.payload}`
            }
        default:
            return state
    }
}