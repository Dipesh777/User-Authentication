import React, { useState, useEffect } from 'react'


const AddForm = (props) => {
    const { submitForm, isSaved, resetForm, title: newTitle, body: newBody } = props
    const [title, setTitle] = useState(newTitle ? newTitle : '')
    const [body, setBody] = useState(newBody ? newBody : '')

    useEffect(() => {
        if (isSaved) {
            setTitle('')
            setBody('')
            resetForm()
        }
    }, [isSaved])

    // input control handler
    const handleChange = (event) => {
        const fieldName = event.target.name
        if (fieldName === 'title') {
            setTitle(event.target.value)
        } else if (fieldName === 'body') {
            setBody(event.target.value)
        }
    }

    // submit handle
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = {
            title: title,
            body: body
        }
        submitForm(formData)

    }

    return (
        <div style={{ width: '400px', height: '400px' }} className='m-2 border border-1 border-dark p-3'>
            <h3 className='text-capitalize p-2'>add notes</h3>
            <form onSubmit={handleSubmit} className='w-100'>
                {/*Notes title input */}
                <input type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    placeholder='Title'
                    className='form-control'
                /> <br />

                {/*Notes body input  */}
                <textarea name="body"
                    cols="23" rows="3"
                    value={body}
                    onChange={handleChange}
                    placeholder='Body'
                    className='my-2 form-control'
                ></textarea> <br />

                {/* save button */}
                <input type="submit"
                    value='Save'
                    className='bg-success text-white px-3'
                />
            </form>
        </div>
    )
}

export default AddForm