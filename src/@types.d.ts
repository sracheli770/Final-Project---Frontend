export type CardType = {
    name: string;
    description: string;
    address: string;
    phone: string;
    image: string;
    bsId: string;
    _id: string;
}

export type DarkModeContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

export type ChildProps = {
    children?: React.ReactNode;
};

export type AuthContextType = {
    isLoggedIn: boolean;
    userName?: string;
    email?: string;
    token?: string;
    isAdmin:boolean;
    login: (userName: string, email: string, token: string) => void;
    logout: () => void
}

export type SignInType = {
    email: string;
    password: string;
}

export type SignUpType = {
    userName: string;
    email: string;
    password: string;
}

declare module '*.mp4' {
    const src: string;
    export default src;
}