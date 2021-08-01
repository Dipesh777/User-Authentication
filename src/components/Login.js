import React, { useState } from 'react'
import axios from 'axios'

const Login = (props) => {
    const { handleAuth } = props
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [formError, setFormError] = useState({})
    const error = {}


    // controling input handler
    const handleChange = (event) => {
        const fieldName = event.target.name
        if (fieldName === 'loginEmail') {
            setLoginEmail(event.target.value)
        } else if (fieldName === 'loginPassword') {
            setLoginPassword(event.target.value)
        }
    }

    // client side validation
    const validation = () => {
        if (loginEmail.length === 0) {
            error.email = 'Email cannot be blank'
        }
        if (loginPassword.length === 0) {
            error.password = 'Password cannot be blank'
        }
    }

    // submit Handler
    const handleSubmit = (event) => {
        event.preventDefault()

        validation()

        if (Object.keys(error).length === 0) {

            setFormError({})

            const formData = {
                email: loginEmail,
                password: loginPassword
            }

            axios.post('https://dct-user-auth.herokuapp.com/users/login', formData)
                .then((response) => {
                    const result = response.data
                    if (result.hasOwnProperty('errors')) {
                        alert(result.errors)
                    } else {
                        alert('you have successfully Logged In')
                        localStorage.setItem('token', result.token)
                        props.history.push('/')
                        handleAuth()
                    }
                })
                .catch((err) => {
                    alert(err)
                })

        } else {
            setFormError(error)
        }

    }

    // cancel button 
    const cancelbtn = (event) => {
        event.preventDefault()
        setLoginEmail('')
        setLoginPassword('')
    }

    return (
        <div style={{width:'600px'}} className='p-5 align-item-center'>

            <h3 className='my-4'>Login to your accout</h3>
            <form onSubmit={handleSubmit}>
                {/* login email */}
                <input type="email"
                    name="loginEmail"
                    value={loginEmail}
                    onChange={handleChange}
                    placeholder='email'
                    className='my-2 form-control'
                />
                {/* client validation */}
                {formError.email && <span className='text-danger'>{formError.email}</span>}
                <br />

                {/* login password */}
                <input type="password"
                    name="loginPassword"
                    value={loginPassword}
                    onChange={handleChange}
                    placeholder='password'
                    className='my-2 form-control'
                />
                {/* client validation */}
                {formError.password && <span className='text-danger'>{formError.password}</span>}
                <br />

                {/* login button */}
                <input type="submit" value='Login' className='mx-2 bg-success text-white' />

                {/* cancel button */}

                <button className='mx-2 text-white bg-secondary' onClick={cancelbtn}>Cancel</button>
            </form>
        </div>
    )
}

export default Login