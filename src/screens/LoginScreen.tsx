import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> { }

export const LoginScreen = ({ navigation }: Props) => {

    const { logIn, removeError, errorMessage } = useContext(AuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: '',
    });

    const onLogin = () => {
        Keyboard.dismiss();
        logIn({ correo: email, password });
    };

    useEffect(() => {
        if (!errorMessage) return;

        Alert.alert(
            'Something went wrong',
            errorMessage,
            [
                {
                    text: 'Ok',
                    onPress: removeError,
                },
            ]
        );
    }, [errorMessage]);


    return (
        <>
            <Background />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <View style={loginStyles.formContainer}>
                    <WhiteLogo />
                    <Text style={loginStyles.title}>Log In</Text>

                    <Text style={loginStyles.label}>Email:</Text>
                    <TextInput
                        placeholder="Enter your email:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        keyboardType="email-address"
                        underlineColorAndroid="#fff"
                        style={[
                            loginStyles.inputFiled,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS,
                        ]}
                        selectionColor="#ccc"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(value) => onChange(value, 'email')}
                        onSubmitEditing={onLogin}
                    />
                    <Text style={loginStyles.label}>Password:</Text>
                    <TextInput
                        placeholder="******"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="#fff"
                        style={[
                            loginStyles.inputFiled,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS,
                        ]}
                        selectionColor="#ccc"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                        onChangeText={(value) => onChange(value, 'password')}
                        onSubmitEditing={onLogin}
                    />

                    <View
                        style={loginStyles.buttonContainer}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={onLogin}
                        >
                            <Text style={loginStyles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={loginStyles.newUserContainer}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.replace('RegisterScreen')}
                        >
                            <Text style={loginStyles.buttonText}>New Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};
