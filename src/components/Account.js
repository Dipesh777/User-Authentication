import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncAccount } from '../actions/authActions'

const Account = (props) => {
    const dispatch = useDispatch()

    const user = useSelector((state) => {
        return state.user
    })

    // dispatching action for get data of a person who is logged in
    useEffect(() => {
        const redirect = () => props.history.push('/login')
        dispatch(asyncAccount(redirect))
    }, [])

    return (
        <div style={{ width: '600px' }} className='p-5'>
            <h2 className='my-4'>User Account</h2>
            <p className='border p-2'>UserName  - {user.username}</p>
            <p className='border p-2'>Email  - {user.email}</p>
        </div>
    )
}

export default Account