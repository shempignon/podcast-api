import { createLogic } from 'redux-logic'
import {
    PODCAST_SELECT,
    PODCAST_REFRESH,
    PODCAST_FETCH_FULFILLED,
    PODCAST_FETCH_REJECTED
} from './actions'
import { UPDATE_TITLE } from "../layout/actions";

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
            .then(results => {
				if (!results.episodes.length) {
					dispatch({
						type: PODCAST_REFRESH,
						slug: action.slug
					})
				} else {
					dispatch({
						type: PODCAST_FETCH_FULFILLED,
						payload: results
					})
                    dispatch({
                        type: UPDATE_TITLE,
                        title: results.name
                    })
				}
			})
            .catch(err => {
                console.error(err)
                dispatch({
                    type: PODCAST_FETCH_REJECTED,
                    payload: err,
                    error: true
                })
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
				})
			})
			.then(() => done())
	}
})

export default [
    podcastFetchLogic,
	podcastRefreshLogic
]