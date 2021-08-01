import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NotesList from './NotesList'
import AddNotes from './AddNotes'

const NotesContainer = (props) => {
    const [userNotes, setUserNotes] = useState([])


    // get api call for getting user notes
    useEffect(() => {
        axios.get('https://dct-user-auth.herokuapp.com/api/notes', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                setUserNotes(result)
            })
            .catch((err) => {
                alert(err.message)
                props.history.push('./login')
            })
    }, [])

    // Adding new notes
    const addNotes = (note) => {
        setUserNotes([...userNotes, note])
    }

    // Removing Deleted Notes
    const removeItem = (id) => {
        const deleted = userNotes.filter((note) => {
            return note._id !== id
        })
        setUserNotes(deleted)
    }

    // Edit Notes functionality
    const EditNote = (data) => {
        const edited = userNotes.map((ele) => {
            if (ele._id === data._id) {
                return { ...data }
            } else {
                return { ...ele }
            }
        })

        setUserNotes(edited)

    }


    return (
        <div className='d-flex'>
            <NotesList userNotes={userNotes} removeItem={removeItem} EditNote={EditNote} />
            <AddNotes addNotes={addNotes} />
        </div>
    )
}

export default NotesContainer