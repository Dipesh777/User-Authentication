import React from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Account from './Account'
import NotesContainer from './My Notes/NotesContainer'

const NavBar = (props) => {
    const { loggedIn, handleAuth } = props

    // Handling logout functinality
    const handleLogout = () => {
        localStorage.removeItem('token')
        alert('successfully Logged out')
        handleAuth()
        props.history.push('/')
    }

    return (
        <div>
            <div className='fs-4 border rounded-pill bg-light p-2'>
                <ul className='navbar-nav flex-row justify-content-around'>
                    <li><Link to='/' className='text-decoration-none text-dark'>Home</Link></li>
                    {loggedIn ? (
                        <>
                            <li ><Link to='/account' className='text-decoration-none text-dark'>Account</Link></li>
                            <li><Link to='/mynotes' className='text-decoration-none text-dark'>My Notes</Link></li>
                            <li><Link to='/' className='text-decoration-none text-dark' onClick={handleLogout}>Logout</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to='/register' className='text-decoration-none text-dark'>Register</Link></li>
                            <li><Link to='/login' className='text-decoration-none text-dark'>Login</Link></li>
                        </>
                    )}
                </ul>
            </div>

            <Route path='/' component={Home} exact={true} />
            <Route path='/register' component={Register} />
            <Route path='/login' render={(props) => {
                return <Login
                    {...props}
                    handleAuth={handleAuth}
                />
            }} />

            <Route path='/account' component={Account} />
            <Route path='/mynotes' component={NotesContainer} />
        </div>
    )
}

// const wrappedConponent = withRouter(NavBar)
// export default wrappedConponent
export default withRouter(NavBar)