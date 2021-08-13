import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { asyncviewNote, asyncDeleteNote } from '../../actions/notesActions'
import axios from 'axios'
import AddForm from './AddForm'

const NotesItem = (props) => {
    const { _id, title, body, EditNote } = props
    const [edit, setEdit] = useState(false)

    const dispatch = useDispatch()

    const toggle = () => {
        setEdit(!edit)
    }

    // Edit Functionality 
    const EditItem = () => {
        toggle()
    }

    const submitForm = (formData) => {
        axios.put(`https://dct-user-auth.herokuapp.com/api/notes/${_id}`, formData, {
            headers: {
                "x-auth": localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                EditNote(result)
                toggle()
            })
            .catch((err) => {
                alert(err.message)
            })

    }


    // Delete functionality
    const deleteItem = () => {
        const deleteConfirm = window.confirm('Are you Sure?')
        deleteConfirm && (
            dispatch(asyncDeleteNote(_id))
        )
    }

    // sweet alert
    const showNote = () => {
        dispatch(asyncviewNote(_id))
    }



    return (
        <>
            {edit ? <AddForm submitForm={submitForm} title={title} body={body} /> : (
                <div className='d-flex justify-content-between align-items-center  border my-3 py-2 px-4'>
                    <h1 onClick={showNote} className='small flex-grow'>{title}</h1>
                    <div className='d-flex'>
                        <button className='bg-warning  mx-2' onClick={EditItem}>Edit</button>
                        <button className='bg-danger text-white' onClick={deleteItem}>Delete</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default NotesItem