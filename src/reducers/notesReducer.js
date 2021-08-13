import { GET_NOTES, NEW_NOTE, DELETE_NOTE, EDIT_NOTE } from '../actions/notesActions'
const intial = []

const notesReducer = (state = intial, action) => {
    switch (action.type) {
        case GET_NOTES: {
            return state = action.payload
        }
        case NEW_NOTE: {
            return [...state, action.payload]
        }
        case DELETE_NOTE: {
            return state.filter((ele) => {
                return ele._id !== action.payload
            })
        }
        case EDIT_NOTE: {
            return state.map((ele) => {
                if (ele._id === action.payload['_id']) {
                    return { ...action.payload }
                } else {
                    return { ...ele }
                }
            })
        }
        default: {
            return [...state]
        }
    }
}

export default notesReducer