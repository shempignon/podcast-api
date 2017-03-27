import { key, PLAY, PAUSE, MUTE, UNMUTE, UPDATE_VOLUME, UPDATE_TIME, SET_SONG, SET_TIME, updateTime } from './actions'
import { store } from '../store'

let audio = new Audio()
audio.addEventListener('timeupdate', event => store.dispatch(updateTime(event)))

const initialState = {
  isPlaying: false,
  muted: false,
  volume: audio.volume,
  src: '',
  currentTime: '',
  duration: 0.0,
  completed: 0.0
}

export const selectors = {
  audio: state => state[key].audio
}

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
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
    case UPDATE_TIME:
      {
        const { currentTime, duration, completed } = payload

        return { ...state, currentTime, duration, completed }
      }
    case UPDATE_VOLUME:
      {
        audio.volume = payload

        return { ...state, volume: payload }
      }
    case SET_TIME:
      {
        const newCurrentTime = state.currentTime * parseFloat(payload) / 100
        audio.currentTime = newCurrentTime

        return { ...state, currentTime: newCurrentTime }
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
