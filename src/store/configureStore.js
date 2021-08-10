import { createStore, combineReducers } from "redux";
import userReducer from "../reducers/userReducer";

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer
    }))
    return store
}

export default configureStore