import axios from 'axios'

// Registration data api action
export const asyncRegistration = (formData, redirect) => {
    return () => {
        axios.post('http://dct-user-auth.herokuapp.com/users/register', formData)
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.message)
                } else {
                    alert('you have Successfully Registered')
                    redirect()
                }
            })
            .catch((err) => {
                console.log(err)
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
                    alert(result.errors)
                } else {
                    alert('you have successfully Logged In')
                    localStorage.setItem('token', result.token)
                    redirect()
                    handleAuth()
                }
            })
            .catch((err) => {
                alert(err)
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
        axios.get('http://dct-user-auth.herokuapp.com/users/account', {
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
                alert(err.message)
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