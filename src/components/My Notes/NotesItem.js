import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { asyncviewNote, asyncDeleteNote, asyncEditNote } from '../../actions/notesActions'
import AddForm from './AddForm'

const NotesItem = (props) => {
    const { _id, title, body } = props
    const [edit, setEdit] = useState(false)

    const dispatch = useDispatch()

    const toggle = () => {
        setEdit(!edit)
    }

    // Edit Functionality 
    const EditItem = () => {
        toggle()
    }

    // Edit Functionality by getting update formData
    const submitForm = (formData) => {
        dispatch(asyncEditNote(formData, _id, toggle))
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