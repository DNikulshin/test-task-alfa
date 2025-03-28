'use client'

import React, { useEffect } from 'react';
import { useProductStore } from '@/store/store';
import { useParams } from 'next/navigation';
import { Product } from '@/components/Product';
import Link from 'next/link';
import { PATH_PRODUCTS } from '@/constants/constants';

export default function ProductPage() {

    const { id } = useParams()

    const product = useProductStore(state => state.product)
    const getProductById = useProductStore(state => state.getProductById)
    const isLoading = useProductStore((state) => state.isLoading)
    const isError = useProductStore(state => state.isError)


    useEffect(() => {
        if (id) {
            getProductById(id.toString())
        }
    }, [id, getProductById])


    if (isLoading && !product) {
        return <div className='flex w-full justify-center items-center'>Loading...</div>
    }

    if (isError) {
        return <div className='text-red-500 text-center'>Error</div>
    }

    return (

        <div className='flex flex-col gap-4 justify-center items-center w-full'>
            <Link href={PATH_PRODUCTS} className='underline text-blue-600'>Back to List</Link>
            <Product {...product} widthImage={150} heightImage={150} isSingle={true} />
        </div>
    )
}
