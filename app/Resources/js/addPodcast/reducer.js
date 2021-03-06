import { key, ADD_PODCAST_SUCCESS, ADD_PODCAST_FAILTURE, PODCAST_FIELD_UPDATED, PODCAST_FIELD_INVALID } from './actions'

const initialState = {
  fields: {
    url: ''
  },
  errors: [],
  valid: false,
  message: ''
}

export const selectors = {
  fields: state => state[key].fields,
  errors: state => state[key].errors,
  valid: state => state[key].valid,
  message: state => state[key].message
}

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {
    case PODCAST_FIELD_UPDATED:
      {
        const fieldUpdate = payload
        const updatedFields = {
          ...state.fields,
          [fieldUpdate.name]: fieldUpdate.value
        }

        return {
          ...state,
          fields: updatedFields,
          errors: [],
          valid: true,
          message: ''
        }
      }
    case PODCAST_FIELD_INVALID:
      {
        const { errors, fieldUpdate } = payload
        const updatedFields = {
          ...state.fields,
          [fieldUpdate.name]: fieldUpdate.value
        }

        return {
          ...state,
          fields: updatedFields,
          errors: errors,
          valid: false,
          message: ''
        }
      }
    case ADD_PODCAST_SUCCESS:
      return {
        ...state,
        fields: { url: '' },
        errors: [],
        valid: false,
        message: 'Podcast added successfully'
      }
    case ADD_PODCAST_FAILTURE:
      return {
        ...state,
        errors: state.errors.concat(payload.message),
        message: ''
      }
    default:
      return state
  }
}
