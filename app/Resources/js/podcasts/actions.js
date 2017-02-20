// Key
export const key = 'podcasts'

// Action types
export const PODCASTS_FETCH = 'PODCASTS_FETCH'
export const PODCASTS_FETCH_FULFILLED = 'PODCASTS_FETCH_FULFILLED'
export const PODCASTS_FETCH_REJECTED = 'PODCASTS_FETCH_REJECTED'

export const actionTypes = {
    PODCASTS_FETCH,
    PODCASTS_FETCH_FULFILLED,
    PODCASTS_FETCH_REJECTED
}

// Action creators
export const fetchPodcasts = () => ({ type: PODCASTS_FETCH })
export const fetchFulfilled = payload => ({type: PODCASTS_FETCH_FULFILLED, payload})
export const fetchRejected = err => ({
    type: PODCASTS_FETCH_REJECTED,
    payload: err,
    error: true
})

export const actions = {
    fetchPodcasts,
    fetchRejected,
    fetchFulfilled
}