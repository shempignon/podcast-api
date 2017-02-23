import { UPDATE_TITLE, TOGGLE_DRAWER } from './actions'

const initialState = {
    title: 'Podcasts',
    openDrawer: false
}

export default function reducer(state = initialState, action){
    switch(action.type) {
        case UPDATE_TITLE:
            return {
                ...state,
                title: action.title
            }
		case TOGGLE_DRAWER:
			return {
				...state,
				openDrawer: !state.openDrawer
			}
        default:
            return state
    }
}