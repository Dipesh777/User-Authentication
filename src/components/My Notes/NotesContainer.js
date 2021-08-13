import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NotesList from './NotesList'
import AddNotes from './AddNotes'
import { startGetNotes } from '../../actions/notesActions'

const NotesContainer = (props) => {

    const userNotes = useSelector((state) => {
        return state.userNotes
    })

    console.log(userNotes)
    const dispatch = useDispatch()


    // get api call for getting user notes
    useEffect(() => {
        // IF error then redirection to login
        const errorRedirect = () => {
            props.history.push('./login')
        }
        dispatch(startGetNotes(errorRedirect))
    }, [])

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
            <NotesList EditNote={EditNote} />
            <AddNotes />
        </div>
    )
}

export default NotesContainer