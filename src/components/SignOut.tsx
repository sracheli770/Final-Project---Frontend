import React, { useContext } from 'react'
import AuthContext from '../context/authContext'
import authService from '../services/auth.service'

const SignOut = () => {
    const { logout } = useContext(AuthContext)

    const handleSignOut = () => {
        authService.signOut();
        logout()
    }

    return (
        <>
            <span className='btn btn-primary mx-2' onClick={handleSignOut}>Sign Out</span>
        </>
    )
}

export default SignOut