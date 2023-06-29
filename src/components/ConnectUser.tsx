import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/authContext';

const ConnectUser = () => {
    const { userName } = useContext(AuthContext) ?? 'Guset'
    const token = localStorage.getItem('token');

    //רק למשתמשים מחוברים
    if (!token) {
        return <Navigate to='/' />
    }

    fetch('http://localhost:3001/api/books/fantasy', {
        headers: { 'Authorization': token }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })


    return (
        <div>
            <h2>Hello {userName}</h2>
        
        </div>
    )
}

export default ConnectUser