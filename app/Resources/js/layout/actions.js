// Key
export const key = 'layout'

// Action types
export const UPDATE_TITLE = 'UPDATE_TITLE'

export const actionTypes = {
    UPDATE_TITLE
}

// Action creators
export const updateTitle = title => ({ type: UPDATE_TITLE, title })

export const actions = {
    updateTitle
}