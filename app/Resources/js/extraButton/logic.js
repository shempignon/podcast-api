import { createLogic } from 'redux-logic'
import { UPDATE_EXTRA_BUTTON_ACTION } from './actions'
import { refreshCurrentPodcast } from '../podcast/actions'
import { demandFullRefresh } from '../latestEpisodes/actions'

export const identifyPath = path => {
  const regex = /^\/(.+)\/.+/
  const match = regex.exec(path)

  return (match === null) ? false : match[1]
}

const extraButtonActionLogic = createLogic({
  type: UPDATE_EXTRA_BUTTON_ACTION,
  debounce: 500,

  validate ({ getState, action }, allow, reject) {
    if (action.payload) {
      allow(action)
    } else {
      reject()
    }
  },

  process ({ httpClient, getState, action }, dispatch, done) {
    switch (identifyPath(action.payload)) {
      case 'podcast':
        dispatch(refreshCurrentPodcast())
        break
      case 'episodes':
        dispatch(demandFullRefresh())
        break
      default:
    }

    done()
  }
})

export default [
  extraButtonActionLogic
]
