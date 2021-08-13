import { GET_NOTES, NEW_NOTE, DELETE_NOTE } from '../actions/notesActions'
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
        default: {
            return [...state]
        }
    }
}

export default notesReducer