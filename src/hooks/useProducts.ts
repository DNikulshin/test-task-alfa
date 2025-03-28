
import { ICreateProduct, IProduct, IResponseProducts, IUpdateProduct } from '@/types/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const fetchProducts = async ({ limit, page, filter}: { limit?: string, page?: string, filter?: string }): Promise<IResponseProducts> => {

    const params = new URLSearchParams({
        ...(limit ? { limit } : {}),
        ...(page ? { page } : {}),
        ...(filter ? { filter } : {})
    })

    const url = params.toString() ? `${API_URL}?${params}` : API_URL

    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch products')
    return response.json();
}

export const createProduct = async (product: ICreateProduct): Promise<IProduct> => {
    const response = await fetch(`${API_URL}`, { method: 'POST', body: JSON.stringify(product) })
    if (!response.ok) throw new Error('Failed to create product')
    return response.json()
}

export const deleteProductById = async (id: number): Promise<IProduct> => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Failed to delete product')
    return response.json();
}

export const updateProductById = async (product: IUpdateProduct): Promise<IProduct> => {
    const response = await fetch(`${API_URL}/${product?.id}`, { method: 'PATCH', body: JSON.stringify(product) })
    if (!response.ok) throw new Error('Failed to update product')
    return response.json()
}

export const fetchProductById = async (id: string): Promise<IProduct> => {
    const response = await fetch(`${API_URL}/${id}`)
    if (!response.ok) throw new Error('Failed to fetch productById')
    return response.json()
}







