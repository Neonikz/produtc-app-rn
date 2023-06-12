import React, { createContext, useEffect, useState } from 'react';
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import coffeApi from '../api/coffeApi';
import { ImagePickerResponse } from 'react-native-image-picker';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (categoryId: string, productName: string) => Promise<Producto>;
    updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
    // deleteProduct: (productId: string) => Promise<void>;
    loadProductById: (productId: string) => Promise<Producto>;
    uploadImage: (data: any, id: string) => Promise<void>;
};

export const ProductsContext = createContext({} as ProductsContextProps);


export const ProductsProvider = ({ children }: any) => {


    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
    }, []);


    const loadProducts = async () => {
        try {
            const resp = await coffeApi.get<ProductsResponse>('/productos?limite=50');
            setProducts([...resp.data.productos]);
        } catch (error) {
            console.log(error, 'error loading products');
        }
    };

    const addProduct = async (categoryId: string, productName: string): Promise<Producto> => {
        const resp = await coffeApi.post<Producto>('/productos', {
            nombre: productName,
            categoria: categoryId,
        });
        setProducts([...products, resp.data]);
        return resp.data;
    };

    const updateProduct = async (categoryId: string, productName: string, productId: string) => {
        try {
            const resp = await coffeApi.put<Producto>(`/productos/${productId}`, {
                nombre: productName,
                categoria: categoryId,
            });
            setProducts(products.map(product => {
                return (product._id === productId)
                    ? resp.data
                    : product;
            }));
        } catch (error) {
            console.log(error, 'updating product');
        }
    };

    // const deleteProduct = async (id: string) => {
    //     console.log(id);
    // };

    const loadProductById = async (id: string): Promise<Producto> => {
        const resp = await coffeApi.get<Producto>(`/productos/${id}`);
        return resp.data;
    };

    const uploadImage = async (data: ImagePickerResponse, id: string) => {
        const { uri, type, fileName } = data.assets![0];
        const fileToUpload = {
            uri,
            type,
            name: fileName,
        };
        const formData = new FormData();
        formData.append('archivo', fileToUpload);
        try {
            const resp = await coffeApi.put(`/uploads/productos/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(resp);
        } catch (error) {
            console.log(error);
        };
    };


    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            // deleteProduct,
            loadProductById,
            uploadImage,
        }}>
            {children}
        </ProductsContext.Provider>
    );
};
