import { UPDATE_TITLE } from './actions'

const initialState = {
    title: 'Podcasts'
}

export default function reducer(state = initialState, action){
    switch(action.type) {
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.title
            }
        default:
            return state
    }
}