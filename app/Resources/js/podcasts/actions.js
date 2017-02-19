// Key
export const key = 'podcasts'

// Action types
export const PODCAST_FETCH = 'PODCAST_FETCH'
export const PODCAST_FETCH_FULFILLED = 'PODCAST_FETCH_FULFILLED'
export const PODCAST_FETCH_REJECTED = 'PODCAST_FETCH_REJECTED'

export const actionTypes = {
    PODCAST_FETCH,
    PODCAST_FETCH_FULFILLED,
    PODCAST_FETCH_REJECTED
}

// Action creators
export const fetchPodcasts = () => ({ type: PODCAST_FETCH })
export const fetchRejected = (err) => ({
    type: PODCAST_FETCH_REJECTED,
    payload: err,
    error: true
})
export const fetchFulfilled = (payload) => ({
    type: PODCAST_FETCH_FULFILLED,
    payload
})

export const actions = {
    fetchPodcasts,
    fetchRejected,
    fetchFulfilled
}