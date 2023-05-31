import React, { createContext, useReducer } from 'react';
import { Usuario } from '../interfaces/appInterfaces';
import { AuthState, authReducer } from './authReducer';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: () => void;
    logIn: () => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const signUp = () => { };
    const logIn = () => { };
    const logOut = () => { };
    const removeError = () => { };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            logIn,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
