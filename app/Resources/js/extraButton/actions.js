// Key
export const key = 'addpodcast'

// Action types
export const UPDATE_EXTRA_BUTTON_ACTION = 'UPDATE_EXTRA_BUTTON_ACTION'
export const actionTypes = {
  UPDATE_EXTRA_BUTTON_ACTION
}

// Action creators
export const extraButtonAction = payload => ({
  type: UPDATE_EXTRA_BUTTON_ACTION,
  payload
})
export const actions = {
  extraButtonAction
}
