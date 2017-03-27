import { createLogic } from 'redux-logic'
import {
    LATEST_EPISODES_FETCH,
    fetchLatestEpisodesFullfilled,
    fetchLatestEpisodesRejected,
} from './actions'

const lastestEpisodesFetchLogic = createLogic({
    type: LATEST_EPISODES_FETCH,
    debounce: 500,
    latest: true,

    process({ httpClient, getState, action }, dispatch, done) {
        httpClient.get(`/api/episodes/latest`)
            .then(resp => resp.data)
            .then(results => dispatch(fetchLatestEpisodesFullfilled(results)))
            .catch(err => {
                console.error(err)
                dispatch(fetchLatestEpisodesRejected(err))
            })
            .then(() => done())
    }
})

export default [
    lastestEpisodesFetchLogic
]