import { IProduct } from "@/types/types"
import Image from 'next/image'
/* eslint-disable @typescript-eslint/no-empty-object-type */
interface Props extends Omit<IProduct, 'id'> { }

export const ProductDetails = ({
    title,
    description,
    category,
    image,
    price,
    widthImage,
    heightImage,
    number
}: Props) => {
    return (
        <div className='flex flex-wrap gap-4 items-center w-full px-2 py-2'>
            {number && <span className="py-2">#{number}</span>}
            <div className='flex gap-4 px-4 items-center justify-between w-full'>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'><strong>Title:</strong> <p className='break-words'>{title}</p></div>
                    <div className='flex gap-2'><strong>Category:</strong> {category}</div>
                    <div className='flex gap-2'><strong>Price:</strong>{price} $</div>
                </div>

                <Image src={image} alt={category} width={widthImage} height={heightImage} className='shadow-sm  shadow-amber-50' />

            </div>
            {description && <div className='flex gap-2 px-4'><strong>Description:</strong> <p className='break-words'>{description}</p></div>}
        </div>
    )
}