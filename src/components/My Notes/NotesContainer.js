import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import NotesList from './NotesList'
import AddNotes from './AddNotes'
import { startGetNotes } from '../../actions/notesActions'

const NotesContainer = (props) => {
    const dispatch = useDispatch()

    // get api call for getting user notes
    useEffect(() => {
        
        // IF error then redirection to login
        const errorRedirect = () => {
            props.history.push('./login')
        }
        dispatch(startGetNotes(errorRedirect))
    }, [])

    return (
        <div className='d-flex'>
            <NotesList />
            <AddNotes />
        </div>
    )
}

export default NotesContainer