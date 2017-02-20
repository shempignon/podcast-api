import { createLogic } from 'redux-logic'
import {
    PODCAST_SELECT,
    PODCAST_FETCH_FULFILLED,
    PODCAST_FETCH_REJECTED
} from './actions'

const podcastFetchLogic = createLogic({
    type: PODCAST_SELECT,
    debounce: 500, // ms
    latest: true, // take latest only

    // let's prevent empty requests
    validate({ getState, action }, allow, reject) {
        if (action.slug) {
            allow(action)
        } else { // empty request, silently reject
            reject()
        }
    },

    // use axios injected as httpClient from configureStore logic deps
    process({ httpClient, getState, action }, dispatch, done) {
        httpClient.get(`/feeds/${action.slug}`)
            .then(resp => resp.data) // use results prop of payload
            .then(results => dispatch({
                type: PODCAST_FETCH_FULFILLED,
                payload: results
            }))
            .catch(err => {
                console.error(err); // log since could be render err
                dispatch({
                    type: PODCAST_FETCH_REJECTED,
                    payload: err,
                    error: true
                });
            })
            .then(() => done()); // call done when finished dispatching
    }
})

export default [
    podcastFetchLogic
]