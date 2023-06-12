import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { Picker } from '@react-native-picker/picker';
import { useCategories } from '../hooks/useCategories';
import { LoadingScreen } from './LoadingScreen';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ navigation, route }: Props) => {

    const [tempUri, setTempUri] = useState<string>();
    const { id = '', name = '' } = route.params;
    const { categories, isLoading } = useCategories();
    const { loadProductById, addProduct, updateProduct, uploadImage } = useContext(ProductsContext);

    const { _id, categoryId, image, nombre, onChange, setFormValue } = useForm({
        _id: id,
        categoryId: '',
        nombre: name,
        image: '',
    });

    const loadProduct = async () => {
        if (!id) { return; }
        const product = await loadProductById(id);
        setFormValue({
            _id: id,
            categoryId: product.categoria._id,
            image: product.img || '',
            nombre,
        });
    };

    const saveOrUpdate = async () => {
        if (id) {
            updateProduct(categoryId, nombre, id);
        } else {
            const tempCategoryId = categoryId || categories[0]._id;
            const newProduct = await addProduct(tempCategoryId, nombre);
            onChange(newProduct._id, '_id');
        }
    };

    const takePhoto = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.5,
        }, (resp) => {
            if (resp.didCancel) { return };
            if (!resp.assets![0].uri) return;
            uploadImage(resp, _id);
            setTempUri(resp.assets![0].uri);
        });
    };

    const getPhotoFromGallery = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
        }, (resp) => {
            if (resp.didCancel) { return };
            if (!resp.assets![0].uri) return;
            uploadImage(resp, _id);
            setTempUri(resp.assets![0].uri);
        });
    };

    useEffect(() => {
        navigation.setOptions({
            title: nombre ? nombre : 'Product name',
        });
    }, [nombre]);

    useEffect(() => {
        loadProduct();
    }, []);

    if (isLoading) { return <LoadingScreen />; }

    return (
        <View style={styles.container} >
            <ScrollView>
                <Text style={styles.label}>Product Name:</Text>
                <TextInput
                    placeholder="Product"
                    placeholderTextColor="rgba(0,0,0,0.2)"
                    style={styles.textInput}
                    value={nombre}
                    onChangeText={(value) => onChange(value, 'nombre')}
                />
                <Text style={styles.label}>Category:</Text>
                <View
                    style={styles.picker}
                >
                    <Picker
                        selectedValue={categoryId}
                        onValueChange={(value) => onChange(value, 'categoryId')}
                    >
                        {
                            categories.map(category => (
                                <Picker.Item
                                    style={styles.pickerItem}
                                    label={category.nombre}
                                    value={category._id}
                                    key={category._id}
                                />
                            ))
                        }
                    </Picker>
                </View>


                <Button
                    title="Save product"
                    color="#5856D6"
                    onPress={() => saveOrUpdate()}
                />
                {
                    !!_id && (
                        <View style={styles.buttonsContainer}>
                            <Button
                                title="Camera"
                                color="#5856D6"
                                onPress={takePhoto}
                            />
                            <View style={styles.separator} />
                            <Button
                                title="Gallery"
                                onPress={getPhotoFromGallery}
                                color="#5856D6"
                            />
                        </View>
                    )
                }

                {
                    (image.length > 0 && !tempUri) && (
                        <Image
                            source={{ uri: image }}
                            style={styles.productImage}
                        />
                    )
                }

                {
                    tempUri && (
                        <Image
                            source={{ uri: tempUri }}
                            style={styles.productImage}
                        />
                    )
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 20,
    },
    label: {
        fontSize: 18,
        color: '#000',
    },
    textInput: {
        color: '#000',
        marginVertical: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 45,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    separator: {
        width: 10,
    },
    picker: {
        justifyContent: 'center',
        height: 45,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        marginVertical: 10,
    },
    pickerItem: {
        color: '#000',
    },
    productImage: {
        marginTop: 20,
        width: '100%',
        height: 300,
    },
});
