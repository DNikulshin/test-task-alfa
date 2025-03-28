import { createProduct, deleteProductById, updateProductById, fetchProducts, fetchProductById } from '@/hooks/useProducts';
import { ICreateProduct, IProduct, IUpdateProduct } from '@/types/types';
import { create } from 'zustand';

interface StoreState {
    products: IProduct[]
    totalCount: number
    product: IProduct
    isLoading: boolean
    isError: boolean;
    getProducts: ({ limit, page }: { limit?: string | undefined, page?: string | undefined , filter: string }) => Promise<void>
    createProduct: (product: ICreateProduct) => Promise<void>
    getProductById: (id: string) => Promise<void>
    removeProductById: (id: number) => Promise<void>
    updateProductById: (product: IUpdateProduct) => Promise<void>
}

export const useProductStore = create<StoreState>((set) => ({
    products: [],
    product: {} as IProduct,
    isLoading: false,
    isError: false,
    totalCount: 0,
    getProducts: async ({ limit, page, filter }: { limit?: string, page?: string, filter?: string }) => {
        set({ isLoading: true, isError: false });
        try {
            const response = await fetchProducts({ limit, page, filter })
            set({ products: response?.products });
            set({ totalCount: response?.totalCount })

        } catch (error) {
            console.error(error)
            set({ isError: true })
        } finally {
            set({ isLoading: false })
        }
    },
    createProduct: async (product: ICreateProduct) => {
        try {
            const productData = await createProduct(product)
            set({ product: productData })

            set((state) => ({
                products: [productData, ...state.products],
                totalCount: state.totalCount + 1
            }));
        } catch (error) {
            console.error(error)
            set({ isError: true })
        }
    },
    getProductById: async (id: string) => {
        set({ isLoading: true, isError: false })
        try {
            const product = await fetchProductById(id)
            set({ product })
        } catch (error) {
            console.error(error)
            set({ isError: true })
        } finally {
            set({ isLoading: false })
        }
    },
    updateProductById: async (product: IUpdateProduct) => {
        try {
            const updatedProduct = await updateProductById(product)
            set({ product: updatedProduct })

            set((state) => ({
                products: state.products.map((item) =>
                    item.id === updatedProduct.id
                        ? { ...item, like: item.like }
                        : item
                )
            }))
        } catch (error) {
            console.error(error)
            set({ isError: true })
        }
    },
    removeProductById: async (id: number) => {
        try {
            const deletedProduct = await deleteProductById(id)
            set((state) => ({
                products: state.products.filter(product => product.id !== deletedProduct.id),
                totalCount: state.totalCount - 1
            }));
        } catch (error) {
            console.error(error)
        }
    }
}))