'use client'

import React, { useEffect } from 'react';
import { useStore } from '@/store/store';
import { useParams } from 'next/navigation';
import { Product } from '@/components/Product';
import Link from 'next/link';
export default function ProductPage() {

    const { id } = useParams();
    const product = useStore(state => state.product)
    const getProductById = useStore(state => state.getProductById)
    const isLoading = useStore(state => state.isLoading)
    const isError = useStore(state => state.isError)


    useEffect(() => {
        if (id) {
            getProductById(Number(id));
        }
    }, [id, getProductById]);


    if (isLoading) {
        return <div className='flex w-full justify-center items-center'>Loading...</div>
    }

    if (isError) {
        return <div>Error</div>
    }

    return (
        isLoading ? <div>Loading...</div>
            : <div className='flex flex-col gap-4 justify-center items-center w-full'>
                <Link href="/products" className='underline text-blue-600'>Back to List</Link>
                <Product {...product} width={300} height={300} isSingle />
            </div>
    )
}
