import { createLogic } from 'redux-logic'
import {
    PLAY_SONG,
    setSong,
	play
} from './actions'

const playSongLogic = createLogic({
	type: PLAY_SONG,
	debounce: 500,

	validate({ getState, action }, allow, reject) {
		if (action.song) {
			allow(action)
		} else {
			reject()
		}
	},

	process({ httpClient, getState, action }, dispatch, done) {
	    dispatch(setSong(action.song))
	    dispatch(play())
        done()
	}
})

export default [
    playSongLogic
]