import { IProduct } from '@/types/types'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SlLike } from "react-icons/sl";
import { useStore } from '@/store/store';


export const Product = (
    { id,
        title,
        description,
        category,
        image,
        price,
        rating,
        width = 100,
        height = 100,
        number,
        isSingle

    }: IProduct & { width?: number, height?: number, number?: number, isSingle: boolean }) => {

    const removeProductById = useStore(state => state.removeProductById)
    const isLoading = useStore(state => state.isLoading)

    const [isDetail, setIsDetail] = useState(false)
    const [isLike, setIsLike] = useState(false)

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='flex flex-col gap-4 px-4 pb-3 pt-8 shadow-sm shadow-amber-50 relative'>

            <div className='flex gap-2 justify-between items-center flex-wrap'>

                <div className='flex gap-4 justify-center items-center'>
                    {number && <span>#{number}</span>}
                    <div className='flex gap-2'><strong>Title:</strong> <p className=' break-words px-4 items-start'>{title}</p></div>
                </div>
                {!isSingle && <div className='flex justify-center items-center gap-4 pr-6'>
                    <button
                        className='bg-green-600 px-2 py-1 rounded-sm cursor-pointer'
                        onClick={() => setIsDetail(!isDetail)}
                    >
                        {isDetail ? "Сollapse" : "Show more..."}
                    </button>
                    <Link
                        className='underline text-blue-600'
                        href={`/products/${id}`}
                    >
                        Detail
                    </Link>
                </div>}
            </div>
            {(isDetail || isSingle) &&
                <>

                    <div className='flex gap-4 flex-wrap'>
                        <div className='flex gap-4'>

                            <Image src={image} alt={title} width={width} height={height} />

                            <div className='flex gap-2'><strong>Description:</strong> <p className='break-words'>{description}</p></div>
                        </div>
                        <div>Category: {category}</div>
                        <div>Price: {price} $</div>
                        <div>Count: {rating?.count}</div>
                        <div>Rate: {rating?.rate}</div>
                    </div>

                </>
            }

            {!isSingle && <button className='absolute top-1 right-1 px-1.5 py-0.5 bg-red-500 cursor-pointer'
                onClick={() => removeProductById(id)}
            >x</button>
            }
            <button className={`absolute top-1 left-1.5 px-1.5 py-0.5 cursor-pointer text-lg ${isLike ? 'text-red-500' : 'text-white'}`}
                onClick={() => setIsLike(!isLike)}
            >
                <SlLike />
            </button>

        </div>
    )
}
