import { extractTimesFromAudio } from '../utils'

// Key
export const key = 'player'

// Action types
export const PLAY = 'PLAY'
export const PAUSE = 'PAUSE'
export const MUTE = 'MUTE'
export const UNMUTE = 'UNMUTE'
export const UPDATE_TIME = 'UPDATE_TIME'
export const UPDATE_VOLUME = 'UPDATE_VOLUME'
export const SET_TIME = 'SET_TIME'
export const SET_SONG = 'SET_SONG'
export const PLAY_SONG = 'PLAY_SONG'

export const actionTypes = {
  PLAY,
  PAUSE,
  MUTE,
  UNMUTE,
  UPDATE_TIME,
  UPDATE_VOLUME,
  SET_TIME,
  SET_SONG,
  PLAY_SONG
}

// Action creators
export const play = () => ({ type: PLAY })
export const pause = () => ({ type: PAUSE })
export const mute = () => ({ type: MUTE })
export const unmute = () => ({ type: UNMUTE })
export const updateVolume = payload => ({ type: UPDATE_VOLUME, payload })
export const updateTime = event => ({ type: UPDATE_TIME, payload: extractTimesFromAudio(event) })
export const setTime = payload => ({ type: UPDATE_TIME, payload })
export const setSong = payload => ({ type: SET_SONG, payload })
export const playSong = payload => ({ type: PLAY_SONG, payload })

export const actions = {
  play,
  pause,
  mute,
  unmute,
  updateVolume,
  setTime,
  setSong,
  playSong
}
