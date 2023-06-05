import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ProductsContext } from '../context/ProductsContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { }

export const ProductsScreen = ({ navigation }: Props) => {

    const { products, loadProducts } = useContext(ProductsContext);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('ProductScreen', {})}
                >
                    <Text style={styles.addButton}>Add +</Text>
                </TouchableOpacity>
            ),
        });
    }, []);


    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={product => product._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={
                            () => navigation.navigate('ProductScreen', {
                                id: item._id,
                                name: item.nombre,
                            })
                        }
                    >
                        <Text style={styles.productName}>{item.nombre}</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    productName: {
        color: '#000',
        fontSize: 20,
    },
    itemSeparator: {
        borderBottomWidth: 2,
        marginVertical: 5,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    addButton: {
        marginRight: 10,
        color: '#000',
    },
});
