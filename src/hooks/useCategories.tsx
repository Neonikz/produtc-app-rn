import { useState, useEffect } from 'react';
import { Categoria, CategoriesResponse } from '../interfaces/appInterfaces';
import coffeApi from '../api/coffeApi';

export const useCategories = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Categoria[]>([]);

    const getCategories = async () => {
        try {
            const resp = await coffeApi.get<CategoriesResponse>('/categorias');
            setCategories(resp.data.categorias);
            setIsLoading(false);
        } catch (error) {

        }
    };

    useEffect(() => {
        getCategories();
    }, []);


    return {
        categories,
        isLoading,
    };
};
