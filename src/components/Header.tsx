'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react';

export const Header = () => {
    const pathname = usePathname();

    return (
        <div className='flex justify-between items-center px-4 py-2 container mx-auto shadow-sm shadow-emerald-50 mb-4 sticky top-0 bg-black/85'>
            <h1 className='text-2xl font-bold'>Fake Store</h1>
            <div className='flex gap-4'>
                <Link href='/' className={`font-bold text-xl ${pathname === '/' ? 'underline text-blue-600' : 'text-white/85'}`}>
                    Home
                </Link>
                <Link href='/products' className={`font-bold text-xl ${pathname === '/products' ? 'underline text-blue-600' : 'text-white/85'}`}>
                    Products
                </Link>
            </div>
        </div>
    );
}