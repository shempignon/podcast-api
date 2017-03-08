import { key, PLAY, PAUSE, TOGGLE_SOUND, UPDATE_VOLUME, SET_SONG } from './actions'

let _audio = new Audio()

const initialState = {
    audio: _audio,
    isPlaying: false,
    muted: false,
    song: '',
    volume: 0.0
}

export const selectors = {
    audio: state => state[key].audio
}

export default function reducer(state = initialState, action){
    let { audio } = state
    switch(action.type) {
        case PLAY:
        {
            audio.play()

            return {
                ...state,
                isPlaying: true
            }
        }
        case PAUSE:
        {
            audio.pause()

            return {
                ...state,
                isPlaying: false
            }
        }
        case TOGGLE_SOUND:
        {
            const muted = !audio.muted
            audio.muted = muted

            return {
                ...state,
                muted
            }
        }
        case UPDATE_VOLUME:
        {
            audio.volume = action.volume

            return {
                ...state,
                volume:  action.volume
            }
        }
        case SET_SONG:
        {
            audio.src = action.song

            return {
                ...state,
                song:  action.song
            }
        }
        default:
            return state
    }
}