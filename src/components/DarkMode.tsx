import React, { useContext } from 'react'
import DarkModeContext from '../context/darkModeContext'

const DarkMode = () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext)

    return (
        <span>
            <button className='mx-3 btn btn-success' onClick={() => toggleDarkMode()}>Toggle Mode</button>
            <span>{darkMode ? 'Dark' : "Not Dark"}</span>
        </span>
    )
}

export default DarkMode