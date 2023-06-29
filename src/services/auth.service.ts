import axios from "axios"

const baseUrl = 'http://localhost:3001'

const signUp = (userName: string, email: string, password: string) => {
    return axios.post(baseUrl + '/users/signup', { userName, email, password })
}

const signIn = (email: string, password: string) => {
    return axios.post(baseUrl + '/users/signin', { email, password }).then((res) => {
        const token = res.data.accessToken;
        const userName = res.data.userName;
        const roles = res.data.roles;
        if (token) {
            localStorage.setItem('user', JSON.stringify({ userName, email }))
            localStorage.setItem('token', token);
            localStorage.setItem('roles', JSON.stringify(roles))
        }
        return res.data
    })
}

const signOut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('roles')
}

export { signIn, signOut, signUp }

const authService = { signIn, signOut, signUp }
export default authService 