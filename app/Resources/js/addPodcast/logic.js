import { createLogic } from 'redux-logic'
import {
    ADD_PODCAST,
    ADD_PODCAST_SUCCESS,
    ADD_PODCAST_FAILTURE
} from './actions'
import { PODCASTS_FETCH } from '../podcasts/actions'
import { selectors as addPodcastSel } from './reducer'

const addPodcastLogic = createLogic({
    type: ADD_PODCAST,
    debounce: 500,
    latest: true,

    validate({ getState, action }, allow, reject) {
        const url = addPodcastSel.url(getState())
        if (url) {
            allow(action)
        } else {
            reject()
        }
    },

    // use axios injected as httpClient from configureStore logic deps
    process({ httpClient, getState }, dispatch, done) {
        const url = addPodcastSel.url(getState())
        let params = new FormData()
        params.append('url', url)

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