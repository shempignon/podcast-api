import { createLogic } from 'redux-logic'
import { SEND_NOTIFICATION, toggleSnackbar, setNotification } from './actions'
import { selectors as layoutSelector } from './reducer'

const layoutNotificationSend = createLogic({
    type: SEND_NOTIFICATION,

    validate({ getState, action }, allow, reject) {
        if (action.notification) {
            allow(action)
        } else {
            reject()
        }
    },

    process({ httpClient, getState, action }, dispatch, done) {
        const openSnackbar = layoutSelector.openSnackbar(getState())

        // Close snackbar if it's already opened
        if (openSnackbar) { dispatch(toggleSnackbar()) }

        // Set the notification and open the snackbar
        dispatch(setNotification(action.notification))
        dispatch(toggleSnackbar())

        done()
    }
})

export default [
    layoutNotificationSend
]