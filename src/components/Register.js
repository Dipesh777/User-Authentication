import React, { useState } from 'react'
import axios from 'axios'


const Register = (props) => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [formError, setFormError] = useState({})
    const error = {}




    // form control input handler
    const handleChange = (event) => {
        const fieldName = event.target.name
        if (fieldName === 'userName') {
            setUserName(event.target.value)
        } else if (fieldName === 'userEmail') {
            setUserEmail(event.target.value)
        } else if (fieldName === 'userPassword') {
            setUserPassword(event.target.value)
        }
    }

    // client side validation
    const registerValidation = () => {
        if (userName.length === 0) {
            error.name = 'UserName cannot be Blank'
        }
        if (userEmail.length === 0) {
            error.email = 'Email cannot be Blank'
        }
        if (userPassword.length === 0) {
            error.password = 'Password cannot be Blank'
        }
    }

    // form submit handle
    const handleSubmit = (event) => {
        event.preventDefault()

        registerValidation()
        if (Object.keys(error).length === 0) {
            
            setFormError({})

            const formData = {
                username: userName,
                email: userEmail,
                password: userPassword
            }

            axios.post('http://dct-user-auth.herokuapp.com/users/register', formData)
                .then((response) => {
                    const result = response.data
                    if (result.hasOwnProperty('errors')) {
                        alert(result.message)
                    } else {
                        alert('you have Successfully Registered')
                        props.history.push('/login')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

        } else {
            setFormError(error)
        }
    }

    // cancel button 
    const cancelbtn = (event) => {
        event.preventDefault()
        setUserName('')
        setUserEmail('')
        setUserPassword('')
    }


    return (
        <div style={{width:'600px'}} className='align-middle p-5'>
            <h2 className='text-capitalize mb-4'>register with us</h2>

            <form onSubmit={handleSubmit}>
                {/* userName  */}
                <input type="text"
                    name="userName"
                    placeholder='Enter UserName'
                    value={userName}
                    onChange={handleChange}
                    className='my-2 form-control'

                />
                {formError.name && <span className='text-danger'>{formError.name}</span>}
                <br />

                {/* userEmail */}
                <input type="email"
                    name="userEmail"
                    placeholder='Enter Email'
                    value={userEmail}
                    onChange={handleChange}
                    className='my-2 form-control'
                />
                {formError.email && <span className='text-danger'>{formError.email}</span>}
                <br />

                {/* userPassword */}
                <input type="password"
                    name="userPassword"
                    placeholder='Enter Password'
                    value={userPassword}
                    onChange={handleChange}
                    className='my-2 form-control'
                />
                {formError.password && <span className='text-danger'>{formError.password}</span>}
                <br />

                {/* Register button */}
                <input type="submit" value='Register' className='m-2 bg-success text-white' />

                {/* cancel button */}
                <button className='m-2 bg-secondary text-white' onClick={cancelbtn}>Cancel</button>

            </form>
        </div>
    )
}

export default Register