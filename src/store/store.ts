import { IProduct } from '@/types/types'
import { create } from 'zustand'

interface StoreState {
    products: IProduct[]
    product: IProduct,
    isLoading: boolean
    getProducts: () => Promise<IProduct[] | undefined>
    getProductById: (id: number) => Promise<IProduct | undefined>
    removeProductById: (id: number) => Promise<IProduct | undefined>
    isError: boolean
}

export const useStore = create<StoreState>((set) => ({
    products: [],
    product: {} as IProduct,
    isLoading: false,
    isError: false,
    getProducts: async () => {
        set({ isError: false, isLoading: true });
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL!);

            const products = await response.json() as IProduct[]
            set({ products });
            return products

        } catch (e) {
            console.error(e);
            set({ isError: true });
        } finally {
            set({ isLoading: false });
        }
    },
    getProductById: async (id: number) => {
        set({ isError: false, isLoading: true });
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/${id}`);

            const product = await response.json() as IProduct
            set({ product });
            return product

        } catch (e) {
            console.error(e);
            set({ isError: true });
        } finally {
            set({ isLoading: false });
        }
    },
    removeProductById: async (id: number) => {
        // set({ isError: false, isLoading: true });
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/${id}`, {
                method: 'DELETE'
            });

            const product = await response.json() as IProduct
            set((state) => ({
                products: state.products.filter(product => product.id !== id)
            }));
            return product

        } catch (e) {
            console.error(e);
            // set({ isError: true });
        } finally {
            // set({ isLoading: false });
        }
    },
}));