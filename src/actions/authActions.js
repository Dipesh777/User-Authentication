import axios from 'axios'
import swal from 'sweetalert'

// Registration data api action
export const asyncRegistration = (formData, redirect) => {
    return () => {
        axios.post('https://dct-user-auth.herokuapp.com/users/register', formData)
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    swal(result.message, {
                        icon: 'error'
                    })
                } else {
                    swal('you have Successfully Registered', {
                        icon: 'success'
                    })
                    redirect()
                }
            })
            .catch((err) => {
                swal(err.message, {
                    icon: 'error'
                })
            })
    }
}

// Login auth api action
export const startLogin = (formData, redirect, handleAuth) => {
    return () => {
        axios.post('https://dct-user-auth.herokuapp.com/users/login', formData)
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    swal(result.errors, {
                        icon: 'error'
                    })
                } else {
                    swal('you have successfully Logged In', {
                        icon: 'success'
                    })
                    localStorage.setItem('token', result.token)
                    redirect()
                    handleAuth()
                }
            })
            .catch((err) => {
                swal(err.message, {
                    icon: 'error'
                })
            })
    }
}

// Handling actions for accout detail tab
export const UPDATE_USER = 'UPDATE_USER'

const userUpdaterAction = (data) => {
    return {
        type: UPDATE_USER,
        payload: data
    }
}

// account user detail of logged in
export const asyncAccount = (redirect) => {
    return (dispatch) => {
        axios.get('https://dct-user-auth.herokuapp.com/users/account', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                // setUser(result)
                dispatch(userUpdaterAction(result))
            })
            .catch((err) => {
                swal(err.message, {
                    icon: 'error'
                })
                redirect()
            })
    }
}

// user account loggout action 
export const LOGOUT = 'LOGOUT'

export const startLogout = () => {
    return {
        type: LOGOUT
    }
}