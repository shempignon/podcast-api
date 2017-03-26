import { createLogic } from 'redux-logic'
import { UPDATE_EXTRA_BUTTON_ACTION } from './actions'
import { refreshCurrentPodcast } from '../podcast/actions'


export const identifyPath = path => {
    const regex = /^\/(.+)\/.+/
    const match = regex.exec(path)

    return (null === match) ? false : match[1]
}

const extraButtonActionLogic = createLogic({
    type: UPDATE_EXTRA_BUTTON_ACTION,
    debounce: 500,

    process({ httpClient, getState, action }, dispatch, done) {
        switch (identifyPath(action.payload)) {
            case 'podcast':
                dispatch(refreshCurrentPodcast())
                break
            default:
        }

        done()
    }
})

export default [
    extraButtonActionLogic
]