// Key
export const key = 'podcast'

// Action types
export const PODCAST_SELECT = 'PODCASTS_FETCH'
export const PODCAST_REFRESH = 'PODCAST_REFRESH'
export const PODCAST_FETCH_FULFILLED = 'PODCAST_FETCH_FULFILLED'
export const PODCAST_FETCH_REJECTED = 'PODCASTS_FETCH_REJECTED'

export const actionTypes = {
    PODCAST_SELECT,
	PODCAST_REFRESH,
    PODCAST_FETCH_FULFILLED,
    PODCAST_FETCH_REJECTED
}

// Action creators
export const selectPodcast = slug => ({ type: PODCAST_SELECT, slug })
export const refreshPodcast = slug => ({ type: PODCAST_REFRESH, slug })
export const fetchFulfilled = payload => ({type: PODCAST_FETCH_FULFILLED, payload })
export const fetchRejected = err => ({
    type: PODCAST_FETCH_REJECTED,
    payload: err,
    error: true
})

export const actions = {
    selectPodcast,
    refreshPodcast,
    fetchRejected,
    fetchFulfilled
}