import React from 'react'
import { useSelector } from 'react-redux'
import NotesItem from './NotesItem'


const NotesList = (props) => {

    const userNotes = useSelector((state) => {
        return state.userNotes
    })

    return (
        <div style={{ width: '700px' }} className='m-4'>
            <h3 className='text-capitalize mb-4'>my notes</h3>
            <div className='border border-3 p-3'>

                <h4 className='text-capitalize'>inbox notes ({userNotes.length})</h4>
                {
                    userNotes.length === 0 ? (
                        <>
                            <p>no notes found!</p>
                            <p>add your first note</p>
                        </>
                    ) : (
                        userNotes.map((note) => {
                            return <NotesItem key={note._id} {...note} />
                        })
                    )
                }
            </div>
        </div>
    )
}

export default NotesList