import { createLogic } from 'redux-logic'
import {
    PODCAST_SELECT,
    PODCAST_REFRESH,
    PODCAST_FETCH_FULFILLED,
    PODCAST_FETCH_REJECTED
} from './actions'

const podcastFetchLogic = createLogic({
    type: PODCAST_SELECT,
    debounce: 500,
    latest: true,

    validate({ getState, action }, allow, reject) {
        if (action.slug) {
            allow(action)
        } else {
            reject()
        }
    },

    process({ httpClient, getState, action }, dispatch, done) {
        httpClient.get(`/feeds/${action.slug}`)
            .then(resp => resp.data)
            .then(results => (!results.episodes.length ?
				dispatch({
					type: PODCAST_REFRESH,
					slug: action.slug
				}) :
				dispatch({
					type: PODCAST_FETCH_FULFILLED,
					payload: results
				})))
            .catch(err => {
                console.error(err)
                dispatch({
                    type: PODCAST_FETCH_REJECTED,
                    payload: err,
                    error: true
                });
            })
            .then(() => done())
    }
})

const podcastRefreshLogic = createLogic({
	type: PODCAST_REFRESH,
	debounce: 500,
	latest: true,

	validate({ getState, action }, allow, reject) {
		if (action.slug) {
			allow(action)
		} else {
			reject()
		}
	},

	process({ httpClient, getState, action }, dispatch, done) {
		httpClient.get(`/feeds/${action.slug}/refresh`)
			.then(resp => resp.data)
			.then(results => dispatch({
				type: PODCAST_SELECT,
				slug: action.slug
			}))
			.catch(err => {
				console.error(err)
				dispatch({
					type: PODCAST_FETCH_REJECTED,
					payload: err,
					error: true
				});
			})
			.then(() => done())
	}
})

export default [
    podcastFetchLogic,
	podcastRefreshLogic
]