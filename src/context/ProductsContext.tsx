import React, { createContext, useEffect, useState } from 'react';
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import coffeApi from '../api/coffeApi';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (categoryId: string, productName: string) => Promise<void>;
    updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
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

    const addProduct = async (categoryId: string, productName: string) => {

    };

    const updateProduct = async (categoryId: string, productName: string, productId: string) => {

    };

    const deleteProduct = async (id: string) => {

    };

    const loadProductById = async (id: string) => {
        throw new Error('Not implemented');
    };

    const uploadImage = async (data: any, id: string) => {

    };


    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage,
        }}>
            {children}
        </ProductsContext.Provider>
    );
};
