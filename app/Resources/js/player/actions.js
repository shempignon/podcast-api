// Key
export const key = 'player'

// Action types
export const PLAY = 'PLAY'
export const PAUSE = 'PAUSE'
export const TOGGLE_SOUND = 'TOGGLE_SOUND'
export const UPDATE_VOLUME = 'UPDATE_VOLUME'
export const SET_SONG = 'SET_SONG'
export const PLAY_SONG = 'PLAY_SONG'

export const actionTypes = {
    PLAY,
    PAUSE,
    TOGGLE_SOUND,
    UPDATE_VOLUME,
    SET_SONG,
    PLAY_SONG
}

// Action creators
export const play = () => ({ type: PLAY })
export const pause = () => ({ type: PAUSE })
export const toggleSound = () => ({ type: TOGGLE_SOUND })
export const updateVolume = volume => ({ type: UPDATE_VOLUME, volume })
export const setSong = song => ({ type: SET_SONG, song })
export const playSong = song => ({ type: PLAY_SONG, song })

export const actions = {
    play,
    pause,
    toggleSound,
    updateVolume,
    setSong,
    playSong
}