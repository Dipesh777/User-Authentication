import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startLogin } from '../actions/authActions'

const Login = (props) => {
    const { handleAuth } = props
    const dispatch = useDispatch()
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

            // after login redirection functionality
            const redirection = () => {
                props.history.push('/')
            }

            //dispacting the action
            dispatch(startLogin(formData, redirection, handleAuth))

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
        <div style={{ width: '600px' }} className='p-5 align-item-center'>

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
            <h6 className='mt-5'>Demo Login ID and password</h6>
            <p className='m-0'>Id - dipesh1@gmail.com</p>
            <p>password - dipesh123</p>
        </div>
    )
}

export default Login