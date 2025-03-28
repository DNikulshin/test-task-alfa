import React from 'react'
import mainImage from '../../public/intro.svg'

import Image from 'next/image'
import Link from 'next/link';
import { PATH_API, PATH_PRODUCTS } from '@/constants/constants';

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center gap-6'>
      <Link href={PATH_PRODUCTS} className='underline text-bold text-lg text-blue-600'>Go to Products</Link>
      <Image src={mainImage} width={500} height={500} alt='main-image' />
      <p className='text-center flex gap-2 items-center'>Test the app on NextJS with api: <Link href={PATH_API} className='text-blue-600 underline text-lg'>/products</Link></p>
    </div>
  );
}

