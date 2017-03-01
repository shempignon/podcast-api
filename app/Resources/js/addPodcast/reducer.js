import { ADD_PODCAST, ADD_PODCAST_SUCCESS, ADD_PODCAST_FAILTURE} from './actions'

const initialState = {
    url: '',
    status: ''
}

export default function reducer(state = initialState, action){
    switch(action.type) {
        case ADD_PODCAST:
            return {
                ...state,
                status: 'Loading podcasts...',
                url : action.url
            }
        case ADD_PODCAST_SUCCESS:
            return {
                ...state,
                url: '',
                status: 'Loaded'
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