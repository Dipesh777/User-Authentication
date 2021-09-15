import axios from "axios";
import swal from 'sweetalert'


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
                swal(err.message, {
                    icon: 'error'
                })
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
                    swal(result.message, {
                        icon: 'error'
                    })
                } else {
                    dispatch(newNote(result))
                    swal('Note Added Successfuly', {
                        icon: 'success'
                    })
                    resetForm()
                }

            })
            .catch((err) => {
                swal(err.message, {
                    icon: 'error'
                })
            })
    }
}

// view Note on sweetalert 
export const asyncviewNote = (_id) => {
    return () => {
        axios.get(`https://dct-user-auth.herokuapp.com/api/notes/${_id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                swal({
                    title: result.title,
                    text: result.body
                })
            })
            .catch((err) => {
                swal(err.message, {
                    icon: 'error'
                })
            })
    }
}

// Deleting notes async call
export const DELETE_NOTE = 'DELETE_NOTE'
const deleteNote = (id) => {
    return {
        type: DELETE_NOTE,
        payload: id
    }
}
export const asyncDeleteNote = (_id) => {
    return (dispatch) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover note",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // Async call for Delete
                    axios.delete(`https://dct-user-auth.herokuapp.com/api/notes/${_id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
                        .then((response) => {
                            const result = response.data
                            dispatch(deleteNote(result._id))
                            swal("Note has been deleted", {
                                icon: "success",
                            });
                        })
                        .catch((err) => {
                            alert(err.message)
                        })
                    // Async call for Delete
                }
            });
    }
}


// action for Editing existing Note async update call using put method
export const EDIT_NOTE = 'EDIT_NOTE'
const editNote = (data) => {
    return {
        type: EDIT_NOTE,
        payload: data
    }
}
export const asyncEditNote = (formData, _id, toggle) => {
    return (dispatch) => {
        swal({
            title: "Are you sure?",
            text: "You Want to Save Changes",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willEdit) => {
                if (willEdit) {

                    // Async call for edit notes
                    axios.put(`https://dct-user-auth.herokuapp.com/api/notes/${_id}`, formData, {
                        headers: {
                            "x-auth": localStorage.getItem('token')
                        }
                    })
                        .then((response) => {
                            const result = response.data
                            dispatch(editNote(result))
                            toggle()
                            swal("Your Changes Saved Successfuly", {
                                icon: "success",
                            });
                        })
                        .catch((err) => {
                            swal(err.message, {
                                icon: 'error'
                            })
                        })

                    // Async call for edit notes
                }
            });

    }
}