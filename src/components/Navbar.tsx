import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../context/authContext'
import DarkMode from './DarkMode'
import SignOut from './SignOut'

const Navbar = () => {
    const { isLoggedIn, userName } = useContext(AuthContext)

    return (
        <div className='w-50 mx-auto'>
            <NavLink className='mx-3' to="/">Home</NavLink>
            <NavLink className='mx-3' to="/cards">Cards</NavLink>
            <NavLink className='mx-3' to="/connect">Connect</NavLink>


            {!isLoggedIn && <NavLink className='mx-3' to="/signin">Sign In</NavLink>}
            {!isLoggedIn && <NavLink className='mx-3' to="/signup">Sign Up</NavLink>}
            {isLoggedIn && <NavLink className='mx-3' to="/onlyadmin">Admin?</NavLink>}

            <span className='mx-3'>Hi {userName} {!isLoggedIn && <span>Guest</span>}</span>
            {isLoggedIn && <SignOut />}
            <DarkMode />

        </div>
    )
}

export default Navbar