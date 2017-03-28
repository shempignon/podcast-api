// Key
export const key = 'layout'

// Action types
export const UPDATE_TITLE = 'UPDATE_TITLE'
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const CLOSE_DRAWER = 'CLOSE_DRAWER'
export const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION'
export const SEND_NOTIFICATION = 'SEND_NOTIFICATION'
export const TOGGLE_SNACKBAR = 'TOGGLE_SNACKBAR'

export const actionTypes = {
  UPDATE_TITLE,
  TOGGLE_DRAWER,
  CLOSE_DRAWER,
  UPDATE_NOTIFICATION,
  SEND_NOTIFICATION,
  TOGGLE_SNACKBAR
}

// Action creators
export const updateTitle = payload => ({ type: UPDATE_TITLE, payload })
export const toggleDrawer = () => ({ type: TOGGLE_DRAWER })
export const closeDrawer = () => ({ type: CLOSE_DRAWER })
export const setNotification = payload => ({ type: UPDATE_NOTIFICATION, payload })
export const sendNotification = payload => ({ type: SEND_NOTIFICATION, payload })
export const toggleSnackbar = () => ({ type: TOGGLE_SNACKBAR })

export const actions = {
  updateTitle,
  toggleDrawer,
  closeDrawer,
  setNotification,
  sendNotification,
  toggleSnackbar
}
