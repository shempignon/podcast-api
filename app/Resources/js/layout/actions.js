// Key
export const key = 'layout'

// Action types
export const UPDATE_TITLE = 'UPDATE_TITLE'
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'

export const actionTypes = {
    UPDATE_TITLE,
	TOGGLE_DRAWER
}

// Action creators
export const updateTitle = title => ({ type: UPDATE_TITLE, title })
export const toggleDrawer = () => ({ type: TOGGLE_DRAWER })

export const actions = {
    updateTitle,
    toggleDrawer
}