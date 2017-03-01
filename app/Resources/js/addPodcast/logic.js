import { createLogic } from 'redux-logic'
import {
    ADD_PODCAST,
    ADD_PODCAST_SUCCESS,
    ADD_PODCAST_FAILTURE
} from './actions'
import {PODCASTS_FETCH} from "../podcasts/actions";

const addPodcastLogic = createLogic({
    type: ADD_PODCAST,
    debounce: 500,
    latest: true,

    validate({ getState, action }, allow, reject) {
        if (action.url) {
            allow(action)
        } else {
            reject()
        }
    },

    // use axios injected as httpClient from configureStore logic deps
    process({ httpClient, getState, action }, dispatch, done) {
        let params = new FormData()
        params.append('url', action.url)

        httpClient.post('/feeds', params)
            .then(resp => resp.data)
            .then(results => {
                dispatch({
                    type: ADD_PODCAST_SUCCESS,
                    payload: results
                })
                dispatch({ type: PODCASTS_FETCH })
            })
            .catch(err => {
                console.error(err)
                dispatch({
                    type: ADD_PODCAST_FAILTURE,
                    payload: err,
                    error: true
                })
            })
            .then(() => done())
    }
})

export default [
    addPodcastLogic
]