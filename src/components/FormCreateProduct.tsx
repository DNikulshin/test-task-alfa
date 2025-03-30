'use client'
import { useProductStore } from "@/store/store";
import { ICreateProduct } from "@/types/types";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { redirect } from 'next/navigation'


export const FormCreateProduct = () => {
    const [product, setProduct] = useState<ICreateProduct>({} as ICreateProduct)
    const createProduct = useProductStore(state => state.createProduct)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        if (!product.title || !product.description || !product.category || !product.price || !product.image) {
            setError('All fields must be filled!')
            return
        }
        await createProduct(product)
        redirect('/products')


    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
        setError(null)
    };

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    image: reader.result as string,
                }));
            };
            try {
                reader.readAsDataURL(file);
            } catch (error) {
                console.error('Error reading file:', error);
                setError('Unable to convert the file to Base64. Please try another file.');
            }
        }
        setError(null)
    }

    return (
        <form onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="w-full flex gap-4 flex-col px-4 pt-8 pb-4 md:w-3/4 bg-gray-900 shadow-sm shadow-amber-100 mx-auto">
            {error && <div className="text-red-500 text-center">{error}</div>}
            <input
                className="border border-amber-50 px-2 py-1"
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                placeholder="Product Title"
            />
            <input
                className="border border-amber-50 px-2 py-1"
                type="text"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Product Description"
            />
            <input
                className="border border-amber-50 px-2 py-1"
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="Product Category"
            />
            <input
                className="border border-amber-50 px-2 py-1"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                placeholder="Product Image"
            />
            <input
                className="border border-amber-50 px-2 py-1"
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Product Price"
            />

            <div className="flex gap-8 w-full justify-center items-center px-4">
                <button
                    className="bg-green-500/85 rounded-sm px-4 py-2 cursor-pointer text-lg ml-auto"
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}
