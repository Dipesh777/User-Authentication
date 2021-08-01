import React, { useState } from 'react'
import NotesItem from './NotesItem'


const NotesList = (props) => {
    const { userNotes, removeItem, EditNote } = props

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
                            return <NotesItem key={note._id} {...note} removeItem={removeItem} EditNote={EditNote} />
                        })
                    )
                }
            </div>
        </div>
    )
}

export default NotesList