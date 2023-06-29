import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthContext from '../context/authContext'
import * as yup from 'yup'
import { SignUpType } from '../@types'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import authService from '../services/auth.service'
import { ColorRing } from "react-loader-spinner";

const SignUp = () => {
    const { isLoggedIn } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const nav = useNavigate()
    const [errMessage, setErrMessage] = useState<string | undefined>(undefined)

    const initialValues: SignUpType = {
        userName: '',
        email: '',
        password: ''
    }

    const validationSchema = yup.object({
        userName: yup.string().min(3).required(),
        email: yup.string().email('Must be a valid email').min(3).required(),
        password: yup.string().min(3, 'Password is too short').required()
    })

    const handleSignUp = (formValues: SignUpType) => {
        setIsLoading(true)
        const { userName, email, password } = formValues

        authService.signUp(userName, email, password)
            .then((res) => {
                console.log(res.data);
                nav('/signin')
            })
            .catch(e => {
                console.log(e);
                alert(e)
                setErrMessage(JSON.stringify(e.response.data))
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    if (isLoggedIn) {
        return <Navigate to='/' />
    }

    return (
        <div>
            {errMessage && <div>${errMessage}</div>}
            {isLoading && (
                <div className="mx-auto w-25">
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{ margin: "0 auto" }}
                        wrapperClass="blocks-wrapper"
                        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                    />
                </div>
            )}

            <Formik
                initialValues={initialValues}
                onSubmit={handleSignUp}
                validationSchema={validationSchema}
            >
                <Form className='w-50 mx-auto'>
                    <div>
                        <label htmlFor="userName" className='form-label'>User Name</label>
                        <Field name='userName' type='text' className='form-control' id='userName' />
                        <ErrorMessage name='userName' component='div' className='alert alert-danger' />
                    </div>

                    <div>
                        <label htmlFor="email" className='form-label'>Email</label>
                        <Field name='email' type='email' className='form-control' id='email' />
                        <ErrorMessage name='email' component='div' className='alert alert-danger' />
                    </div>

                    <div>
                        <label htmlFor="password" className='form-label'>Password</label>
                        <Field name='password' type='password' className='form-control' id='password' />
                        <ErrorMessage name='password' component='div' className='alert alert-danger' />
                    </div>

                    <div>
                        <button disabled={isLoading} className='btn btn-primary' type='submit'>Sign Up</button>
                    </div>
                </Form>

            </Formik>
        </div>
    )
}

export default SignUp