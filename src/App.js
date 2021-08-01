import React, { useState, useEffect } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

import NavBar from './components/NavBar'

const App = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const handleAuth = () => {
    setUserLoggedIn(!userLoggedIn)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      handleAuth()
    }
  }, [])
  
  return (
    <div className='container p-3'>
     
      <NavBar loggedIn={userLoggedIn} handleAuth={handleAuth} />
    </div>
  )
}

export default App;
