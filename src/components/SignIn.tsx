import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { SignInType } from '../@types'
import authService from '../services/auth.service'
import * as yup from 'yup'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import AuthContext from '../context/authContext'
import { ColorRing } from 'react-loader-spinner'

const SignIn = () => {
    const { isLoggedIn, login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    //const url = 'http://localhost:3001/users/signin'
    const nav = useNavigate()
    const [errMessage, setErrMessage] = useState<string | undefined>(undefined)

    const initialValues: SignInType = {
        email: '',
        password: ''
    }

    const validationSchema = yup.object({
        email: yup.string().email('Must be a valid email').min(3).required(),
        password: yup.string().min(3, 'Password is too short').required()
    })

    const handleSignIn = (formValues: SignInType) => {
        setIsLoading(true)
        const { email, password } = formValues

        authService.signIn(email, password)
            .then((res) => {
                const token = res.accessToken;
                const userName = res.userName;
                const roles = res.roles
                login(userName, email, token)
                console.log(res);

                nav('/')
            })
            .catch(e => {
                console.log(e);
                setErrMessage(JSON.stringify(e.response.data))
            })
            .finally(() => {
                setIsLoading(false)
            })



        /* const user: SignInType = { email, password, _id: '1' }



        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                user._id = json.id
                setEmail('');
                setPassword('');
                // < Navigate to='/' />
            }) */
    }


    if (isLoggedIn) {
        return <Navigate to='/' />
    }

    return (
        <div>
            <h2>SignIn</h2>
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
            {/* <form>
                <input type="text" value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder='Email Address' /> <br />
                <input type="text" value={password} onChange={e => setPassword(e.currentTarget.value)} placeholder='Password' /> <br />
                <input type="button" value='Sign In' onClick={handleSignIn} />
            </form> */}

            <Formik
                initialValues={initialValues}
                onSubmit={handleSignIn}
                validationSchema={validationSchema}
            >
                <Form className='w-50 mx-auto'>
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
                        <button disabled={isLoading} className='btn btn-primary' type='submit'>Sign In</button>
                    </div>
                </Form>

            </Formik>
        </div>
    )
}

export default SignIn