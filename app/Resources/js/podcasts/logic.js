import { createLogic } from 'redux-logic'
import {
    PODCASTS_FETCH,
    fetchRejected,
    fetchFulfilled
} from './actions'

const podcastFetchLogic = createLogic({
    type: PODCASTS_FETCH,
    debounce: 500,
    latest: true,

    // use axios injected as httpClient from configureStore logic deps
    process({ httpClient }, dispatch, done) {
        httpClient.get('/feeds')
            .then(resp => resp.data)
            .then(results => dispatch(fetchFulfilled(results)))
            .catch(err => {
                console.error(err)
                dispatch(fetchRejected(err))
            })
            .then(() => done())
    }
})

export default [
    podcastFetchLogic
]