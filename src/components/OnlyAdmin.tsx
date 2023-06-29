import React, { useContext } from 'react'
import AuthContext from '../context/authContext'

const OnlyAdmin = () => {
    const { isAdmin,userName } = useContext(AuthContext)

    return (
        <div>
            {isAdmin && <h2>Hi {userName}, you'r the Admin </h2>}
            {!isAdmin && <h2>Sorry {userName}, You'r not Admin</h2>}
        </div>
    )
}

export default OnlyAdmin