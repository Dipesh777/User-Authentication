import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import AddForm from './AddForm'
import { asyncNewNote } from '../../actions/notesActions'

const AddNotes = (props) => {
    const dispatch = useDispatch()
   
    const [isSaved, setIsSaved] = useState(false)

    const resetForm = () => {
        setIsSaved(!isSaved)
    }
    
    // submitting for for putting new note to database
    const submitForm = (formData) => {
        dispatch(asyncNewNote(formData, resetForm))
    }

    return (
        <div className='ms-3 mt-5 pt-4'>
            <AddForm submitForm={submitForm} isSaved={isSaved} resetForm={resetForm} />
        </div>
    )
}

export default AddNotes