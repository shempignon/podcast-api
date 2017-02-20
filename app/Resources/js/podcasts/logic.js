import { createLogic } from 'redux-logic'
import {
    PODCASTS_FETCH,
    PODCASTS_FETCH_FULFILLED,
    PODCASTS_FETCH_REJECTED
} from './actions'

const podcastFetchLogic = createLogic({
    type: PODCASTS_FETCH,
    debounce: 500,
    latest: true,

    // use axios injected as httpClient from configureStore logic deps
    process({ httpClient }, dispatch, done) {
        httpClient.get('/feeds')
            .then(resp => resp.data)
            .then(results => dispatch({
                type: PODCASTS_FETCH_FULFILLED,
                payload: results
            }))
            .catch(err => {
                console.error(err)
                dispatch({
                    type: PODCASTS_FETCH_REJECTED,
                    payload: err,
                    error: true
                })
            })
            .then(() => done())
    }
})

export default [
    podcastFetchLogic
]