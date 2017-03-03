// Key
export const key = 'layout'

// Action types
export const UPDATE_TITLE = 'UPDATE_TITLE'
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION'
export const SEND_NOTIFICATION = 'SEND_NOTIFICATION'
export const TOGGLE_SNACKBAR = 'TOGGLE_SNACKBAR'

export const actionTypes = {
    UPDATE_TITLE,
	TOGGLE_DRAWER,
    UPDATE_NOTIFICATION,
    SEND_NOTIFICATION,
    TOGGLE_SNACKBAR
}

// Action creators
export const updateTitle = title => ({ type: UPDATE_TITLE, title })
export const toggleDrawer = () => ({ type: TOGGLE_DRAWER })
export const setNotification = notification => ({ type: UPDATE_NOTIFICATION, notification })
export const sendNotification = notification => ({ type: SEND_NOTIFICATION, notification })
export const toggleSnackbar = () => ({ type: TOGGLE_SNACKBAR })

export const actions = {
    updateTitle,
    toggleDrawer,
    setNotification,
    sendNotification,
    toggleSnackbar
}