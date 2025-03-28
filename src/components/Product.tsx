import { IProduct } from '@/types/types'
import { useState } from 'react'
import Link from 'next/link'
import { SlLike } from "react-icons/sl";
import { useProductStore } from '@/store/store';
import { ProductDetails } from './ProductDetails';
import { PATH_PRODUCTS } from '@/constants/constants';

export const Product = (
    { id,
        title,
        description,
        category,
        image,
        price,
        widthImage = 100,
        heightImage = 100,
        number,
        isSingle = false,
        like

    }: IProduct) => {

    const removeProductById = useProductStore(state => state.removeProductById)
    const isLoading = useProductStore(state => state.isLoading)
    const updateProductById = useProductStore(state => state.updateProductById)
    const [isLike, setIsLike] = useState(like)

    const handleLikeToggle = () => {
        setIsLike(!isLike);
        updateProductById({
            ...{ id, title, price, category },
            like: !isLike,
        })
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='flex flex-col gap-4 px-4 pb-4 pt-6 shadow-sm shadow-amber-50 relative'>

            {isSingle ?
                <div className='flex flex-wrap gap-2 items-center w-full'>
                    <ProductDetails
                        title={title}
                        description={description}
                        category={category}
                        image={image}
                        price={price}
                        widthImage={widthImage}
                        heightImage={heightImage}
                        number={number}
                    />
                    <button className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 cursor-pointer text-lg ${isLike ? 'text-red-500' : 'text-white'}`}
                        onClick={handleLikeToggle}
                    >
                        <SlLike />
                    </button>

                </div>
                :
                <>
                    <Link href={`${PATH_PRODUCTS}/${id}`}>
                        <div className='flex flex-wrap gap-2 justify-between items-center max-h[250px]'>
                            <div className='flex flex-wrap gap-2 items-center w-full'>
                                <ProductDetails
                                    title={title}
                                    category={category}
                                    image={image}
                                    price={price}
                                    widthImage={widthImage}
                                    heightImage={heightImage}
                                    number={number}
                                />
                            </div>

                        </div>
                    </Link>
                    <button className='absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-red-500 cursor-pointer'
                        onClick={() => {
                            removeProductById(id)
                        }}
                    >
                        x
                    </button>

                    <button className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 cursor-pointer text-lg ${isLike ? 'text-red-500' : 'text-white'}`}
                        onClick={handleLikeToggle}
                    >
                        <SlLike />
                    </button>
                </>
            }
        </div>
    )
}
