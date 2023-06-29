import { createContext, useEffect, useState } from "react";
import { AuthContextType, ChildProps } from "../@types";


const initialState: AuthContextType = {
    isLoggedIn: false,
    isAdmin: false,
    login(userName, email, token) { },
    logout() { }
}

const AuthContext = createContext<AuthContextType>(initialState);

const AuthContextProvider = ({ children }: ChildProps) => {
    const handleIsAdmin = () => {
        const userRoles = localStorage.getItem('roles')
        if (userRoles && userRoles.includes('Role_ADMIN')) {
            setIsAdmin(true)
        }
    }

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            const token = user.token;
            const email = user.email;
            const userName = user.userName;
            login(userName, email, token)
        }

        handleIsAdmin()
    }, [])

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState<string | undefined>(undefined)
    const [email, setEmail] = useState<string | undefined>(undefined)
    const [token, setToken] = useState<string | undefined>(undefined)
    const [isAdmin, setIsAdmin] = useState(false);

    const login = (userName: string, email: string, token: string) => {
        setIsLoggedIn(true);
        setEmail(email);
        setUserName(userName);
        setToken(token);

        handleIsAdmin()
    }

    const logout = () => {
        setIsLoggedIn(false)
        setEmail(undefined)
        setUserName(undefined)
        setToken(undefined)
        setIsAdmin(false)
    }

    const contextValues = { isLoggedIn, userName, email, token, isAdmin, login, logout }

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }
export default AuthContext;