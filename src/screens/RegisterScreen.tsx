import React, { useContext, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { loginStyles } from '../theme/loginTheme';
import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> { }

export const RegisterScreen = ({ navigation }: Props) => {


    const { signUp, errorMessage, removeError } = useContext(AuthContext);

    const { name, email, password, onChange } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const onRegister = () => {
        Keyboard.dismiss();
        signUp({ nombre: name, correo: email, password });
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
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    backgroundColor: '#5856D6',
                }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <View style={loginStyles.formContainer}>
                    <WhiteLogo />
                    <Text style={loginStyles.title}>Sing Up</Text>

                    <Text style={loginStyles.label}>Name:</Text>
                    <TextInput
                        placeholder="Enter your name:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="#fff"
                        style={[
                            loginStyles.inputFiled,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS,
                        ]}
                        selectionColor="#ccc"
                        autoCapitalize="words"
                        autoCorrect={false}
                        onChangeText={(value) => onChange(value, 'name')}
                        onSubmitEditing={onRegister}
                    />
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
                        onSubmitEditing={onRegister}
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
                        onSubmitEditing={onRegister}
                    />

                    <View
                        style={loginStyles.buttonContainer}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={onRegister}
                        >
                            <Text style={loginStyles.buttonText}>Sing Up</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={loginStyles.newUserContainer}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.replace('LoginScreen')}
                        >
                            <Text style={loginStyles.buttonText}>Already register?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    );
}
