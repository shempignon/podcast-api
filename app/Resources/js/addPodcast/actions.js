// Key
export const key = 'addpodcast'

// Action types
export const ADD_PODCAST = 'ADD_PODCAST'
export const ADD_PODCAST_SUCCESS = 'ADD_PODCAST_SUCCESS'
export const ADD_PODCAST_FAILTURE = 'ADD_PODCAST_FAILTURE'

export const actionTypes = {
    ADD_PODCAST,
    ADD_PODCAST_SUCCESS,
    ADD_PODCAST_FAILTURE
}

// Action creators
export const addPodcast = url => ({ type: ADD_PODCAST, url })
export const addPodcastSuccess = payload => ({type: ADD_PODCAST_SUCCESS, payload})
export const addPodcastFailure = err => ({
    type: ADD_PODCAST_FAILTURE,
    payload: err,
    error: true
})

export const actions = {
    addPodcast,
    addPodcastSuccess,
    addPodcastFailure
}