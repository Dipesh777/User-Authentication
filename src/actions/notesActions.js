import axios from "axios";

// api for getting notes data from back end and 
export const GET_NOTES = 'GET_NOTES'
const getNote = (data) => {
    return {
        type: GET_NOTES,
        payload: data
    }
}
export const startGetNotes = (redirectError) => {
    return (dispatch) => {
        axios.get('https://dct-user-auth.herokuapp.com/api/notes', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                dispatch(getNote(result))
            })
            .catch((err) => {
                alert(err.message)
                redirectError()
            })
    }
}

// Action For adding new notes via edit form
export const NEW_NOTE = 'NEW_NOTE'
const newNote = (data) => {
    return {
        type: NEW_NOTE,
        payload: data
    }
}
export const asyncNewNote = (formData, resetForm) => {
    return (dispatch) => {
        axios.post('https://dct-user-auth.herokuapp.com/api/notes', formData, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.message)
                } else {
                    dispatch(newNote(result))
                    resetForm()
                }

            })
            .catch((err) => {
                alert(err.message)
            })
    }
}