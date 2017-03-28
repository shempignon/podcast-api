import { key, UPDATE_TITLE, TOGGLE_DRAWER, CLOSE_DRAWER, TOGGLE_SNACKBAR, UPDATE_NOTIFICATION } from './actions'

const initialState = {
  title: 'Podcasts',
  openDrawer: false,
  openSnackbar: false,
  notification: ''
}

export const selectors = {
  title: state => state[key].title,
  openDrawer: state => state[key].openDrawer,
  openSnackbar: state => state[key].openSnackbar,
  notification: state => state[key].notification
}

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_TITLE:
      return {
        ...state,
        title: payload
      }
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        notification: payload
      }
    case TOGGLE_DRAWER:
      return {
        ...state,
        openDrawer: !state.openDrawer
      }
    case CLOSE_DRAWER:
      return {
        ...state,
        openDrawer: false
      }
    case TOGGLE_SNACKBAR:
      return {
        ...state,
        openSnackbar: !state.openSnackbar
      }
    default:
      return state
  }
}
