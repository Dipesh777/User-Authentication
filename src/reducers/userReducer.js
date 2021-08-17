import { UPDATE_USER, LOGOUT } from '../actions/authActions'

const initialUser = {}

const userReducer = (state = initialUser, action) => {
    switch (action.type) {
        case UPDATE_USER: {
            return state = action.payload
        }
        case LOGOUT: {
            return state = {}
        }
        default: {
            return state
        }
    }
}

export default userReducer