import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ navigation, route }: Props) => {

    const { id, name = '' } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: name ? name : 'New Product',
        });
    }, []);


    return (
        <View>
            <Text style={{ color: '#000' }}>{id} {name}</Text>
        </View>
    );
};
