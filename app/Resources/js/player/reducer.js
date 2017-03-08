import { key, PLAY, PAUSE, MUTE, UNMUTE, UPDATE_VOLUME, SET_SONG } from './actions'

let audio = new Audio()

const initialState = {
    isPlaying: false,
    muted: false,
    volume: 0.0,
    src: ''
}

export const selectors = {
    audio: state => state[key].audio
}

export default function reducer(state = initialState, { type, payload }){
    switch(type) {
        case PLAY:
        {
            audio.play()

            return { ...state, isPlaying: !state.isPlaying }
        }
        case PAUSE:
        {
            audio.pause()

            return { ...state, isPlaying: !state.isPlaying }
        }
        case MUTE:
        {
            audio.muted = true

            return { ...state, muted: true }
        }
        case UNMUTE:
        {
            audio.muted = false

            return { ...state, muted: false }
        }
        case UPDATE_VOLUME:
        {
            audio.volume = payload

            return { ...state, volume: payload }
        }
        case SET_SONG:
        {
            audio.src = payload

            return { ...state, src: payload }
        }
        default:
            return state
    }
}