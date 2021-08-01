import React, { useState } from 'react'
import axios from 'axios'
import AddForm from './AddForm'

const AddNotes = (props) => {
    const { addNotes } = props
    const [isSaved, setIsSaved] = useState(false)

    const submitForm = (formData) => {
        axios.post('https://dct-user-auth.herokuapp.com/api/notes', formData, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.message)
                } else {
                    addNotes(result)
                    resetForm()
                }

            })
            .catch((err) => {
                alert(err.message)
            })
    }

    const resetForm = () => {
        setIsSaved(!isSaved)
    }

    return (
        <div className='ms-3 mt-5 pt-4'>
            <AddForm submitForm={submitForm} isSaved={isSaved} resetForm={resetForm} />
        </div>
    )
}

export default AddNotes