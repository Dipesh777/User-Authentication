import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NotesList from './NotesList'
import AddNotes from './AddNotes'
import { startGetNotes } from '../../actions/notesActions'

const NotesContainer = (props) => {

    const notes = useSelector((state) => {
        return state.userNotes
    })
    const [userNotes, setUserNotes] = useState([])
    // console.log(userNotes)
    const dispatch = useDispatch()


    // get api call for getting user notes
    useEffect(() => {
        // IF error then redirection to login
        const errorRedirect = () => {
            props.history.push('./login')
        }
        dispatch(startGetNotes(errorRedirect))
        setUserNotes([...notes])
    }, [notes])


    // Removing Deleted Notes
    const removeItem = (id) => {
        const deleted = userNotes.filter((note) => {
            return note._id !== id
        })
        // setUserNotes(deleted)
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

        // setUserNotes(edited)

    }


    return (
        <div className='d-flex'>
            <NotesList removeItem={removeItem} EditNote={EditNote} />
            <AddNotes />
        </div>
    )
}

export default NotesContainer