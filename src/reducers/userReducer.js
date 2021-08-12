import { UPDATE_USER } from '../actions/authActions'

const initialUser = {}

const userReducer = (state = initialUser, action) => {
    switch (action.type) {
        case UPDATE_USER: {
            return state = action.payload
        }
        default: {
            return state
        }
    }
}

export default userReducer