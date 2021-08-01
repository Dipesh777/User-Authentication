import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Account = (props) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get('http://dct-user-auth.herokuapp.com/users/account', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                setUser(result)
            })
            .catch((err) => {
                alert(err.message)
                props.history.push('/login')
            })
    }, [])

    return (
        <div style={{width: '600px'}} className='p-5'>
            <h2 className='my-4'>User Account</h2>
            <p className='border p-2'>UserName  - {user.username}</p>
            <p className='border p-2'>Email  - {user.email}</p>
        </div>
    )
}

export default Account