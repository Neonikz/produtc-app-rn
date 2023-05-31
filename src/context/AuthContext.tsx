import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginData, LoginResponse, RegisterData, Usuario } from '../interfaces/appInterfaces';
import { AuthState, authReducer } from './authReducer';
import coffeApi from '../api/coffeApi';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (registerData: RegisterData) => void;
    logIn: (loginData: LoginData) => void;
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

    const logIn = async ({ correo, password }: LoginData) => {
        try {
            const { data } = await coffeApi.post<LoginResponse>('/auth/login', { correo, password });
            dispatch({
                type: 'logIn',
                payload: {
                    token: data.token,
                    user: data.usuario,
                },
            });

            await AsyncStorage.setItem('token', data.token);

        } catch (error: any) {
            dispatch({ type: 'addError', payload: error.response.data.msg || 'Wrong information' });
        }
    };

    const signUp = async ({ nombre, correo, password }: RegisterData) => {
        try {
            const { data } = await coffeApi.post<LoginResponse>('/usuarios', { nombre, correo, password });
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario,
                },
            });
            await AsyncStorage.setItem('token', data.token);
        } catch (error: any) {
            dispatch({ type: 'addError', payload: error.response.data.msg || 'Wrong information' });
        }
    };

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logOut' });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (!token) return dispatch({ type: 'notAuthenticated' });

        try {
            const resp = await coffeApi.get('/auth');
            if (resp.status !== 200) {
                return dispatch({ type: 'notAuthenticated' });
            }
            await AsyncStorage.setItem('token', resp.data.token);
            dispatch({
                type: 'logIn',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario,
                },
            });
        } catch (error) {
            console.log(error);
        }


    };

    useEffect(() => {
        checkToken();
    }, []);


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
