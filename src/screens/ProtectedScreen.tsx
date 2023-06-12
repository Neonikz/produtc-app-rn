import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {

    const { user, token, logOut } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Protected Screen</Text>
            <Button
                title="Log Out"
                color="#5856D6"
                onPress={logOut}
            />

            <Text style={styles.text}>
                {JSON.stringify(user, null, 5)}
            </Text>
            <Text style={styles.text}>
                {JSON.stringify(token, null, 5)}
            </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    text: {
        fontWeight: 'bold',
        color: '#000',
        padding: 20,
    },
});
