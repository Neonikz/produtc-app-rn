import React, { createContext, useReducer } from 'react';
import { LoginData, LoginResponse, Usuario } from '../interfaces/appInterfaces';
import { AuthState, authReducer } from './authReducer';
import coffeApi from '../api/coffeApi';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (loginData: LoginData) => void;
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

    const signUp = async ({ correo, password }: LoginData) => {
        try {
            const { data } = await coffeApi.post<LoginResponse>('/auth/login', { correo, password });
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario,
                },
            });
        } catch (error: any) {
            console.log(error.response.data);
        }
    };

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
