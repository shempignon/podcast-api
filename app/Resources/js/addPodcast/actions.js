// Key
export const key = 'addpodcast'

// Action types
export const ADD_PODCAST = 'ADD_PODCAST'
export const ADD_PODCAST_SUCCESS = 'ADD_PODCAST_SUCCESS'
export const ADD_PODCAST_FAILTURE = 'ADD_PODCAST_FAILTURE'
export const UPDATE_PODCAST_FIELD = 'UPDATE_PODCAST_FIELD'

export const actionTypes = {
    ADD_PODCAST,
    ADD_PODCAST_SUCCESS,
    ADD_PODCAST_FAILTURE,
    UPDATE_PODCAST_FIELD
}

// Action creators
export const updatePodcastField = e => ({
    type: UPDATE_PODCAST_FIELD,
    url: e.target.value
})
export const addPodcast = e => {
    e.preventDefault()

    return { type: ADD_PODCAST }
}
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