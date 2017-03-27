// Key
export const key = 'latestEpisodes'

// Action types
export const LATEST_EPISODES_FETCH = 'LATEST_EPISODES_FETCH'
export const DEMAND_FULL_REFRESH = 'DEMAND_FULL_REFRESH'
export const LATEST_EPISODES_FETCH_FULFILLED = 'EPISODES_FETCH_FULFILLED'
export const LATEST_EPISODES_FETCH_REJECTED = 'EPISODES_FETCH_REJECTED'

export const actionTypes = {
  LATEST_EPISODES_FETCH,
  DEMAND_FULL_REFRESH,
  LATEST_EPISODES_FETCH_FULFILLED,
  LATEST_EPISODES_FETCH_REJECTED
}

// Action creators
export const demandFullRefresh = () => ({ type: DEMAND_FULL_REFRESH })
export const fetchLatestEpisodes = () => ({ type: LATEST_EPISODES_FETCH })
export const fetchLatestEpisodesFullfilled = payload => ({ type: LATEST_EPISODES_FETCH_FULFILLED, payload })
export const fetchLatestEpisodesRejected = payload => ({
  type: LATEST_EPISODES_FETCH_REJECTED,
  payload,
  error: true
})

export const actions = {
  demandFullRefresh,
  fetchLatestEpisodes,
  fetchLatestEpisodesFullfilled,
  fetchLatestEpisodesRejected
}
