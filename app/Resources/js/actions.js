export const PODCAST_FETCH = 'PODCAST_FETCH'
export const PODCAST_FETCH_FULFILLED = 'PODCAST_FETCH_FULFILLED'
export const PODCAST_FETCH_REJECTED = 'PODCAST_FETCH_REJECTED'

export function fetchPodcasts() {
    return { type: PODCAST_FETCH };
}