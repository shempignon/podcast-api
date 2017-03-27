import { createLogic } from 'redux-logic'
import {
    LATEST_EPISODES_FETCH,
    DEMAND_FULL_REFRESH,
    fetchLatestEpisodesFullfilled,
    fetchLatestEpisodesRejected,
    fetchLatestEpisodes,
} from './actions'
import { sendNotification } from '../layout/actions'

const demandFullRefreshLogic = createLogic({
    type: DEMAND_FULL_REFRESH,
    debounce: 500,
    latest: true,

    process({ httpClient, getState, action }, dispatch, done) {
        httpClient.get('/api/feeds/refresh')
            .then(resp => resp.data)
            .then(results => {
                dispatch(sendNotification(`${results} new episodes found`))
                dispatch(fetchLatestEpisodes())
            })
            .catch(err => {
                console.error(err)
                dispatch(fetchLatestEpisodesRejected(err))
            })
            .then(() => done())
    }
})

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
    lastestEpisodesFetchLogic,
    demandFullRefreshLogic
]