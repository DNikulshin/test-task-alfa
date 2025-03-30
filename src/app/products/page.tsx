'use client'
import { Pagination } from "@/components/Pagination"
import { Product } from "@/components/Product"
import { useProductStore } from "@/store/store"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ProductsPage() {
  const [filter, setFilter] = useState('')
  const products = useProductStore(state => state.products)
  const totalCount = useProductStore(state => state.totalCount)
  const getProducts = useProductStore(state => state.getProducts)
  const isLoading = useProductStore(state => state.isLoading)
  const isError = useProductStore(state => state.isError)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5


  useEffect(() => {
    getProducts({ page: currentPage.toString(), limit: itemsPerPage.toString(), filter })
  }, [getProducts, currentPage, filter])

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > Math.ceil(totalCount / itemsPerPage)) return
    setCurrentPage(newPage)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value)
    setCurrentPage(1)
  }

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (isError) {
    return <div className='text-red-500 text-center'>Error</div>
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 min-h-[95%]">
      <div className="flex flex-wrap justify-center items-center w-full gap-4">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1 bg-stone-900"
        >
          <option value="">All Products</option>
          <option value="like">like</option>
        </select>
        <Link className=' bg-green-500 px-4 py-2 rounded-sm cursor-pointer text-md'
          href="/create-product"
        >
          Create Product
        </Link>
        <div className="flex items-center justify-center gap-2">

          {(totalCount > 0) &&
            <>
              <h3 className="text-xl">Count:</h3>
              <strong>
                (<span className="text-green-500">
                  {products.length}
                </span>
                )
              </strong>
              <h3 className="text-xl">Total:</h3>
              <strong>
                (<span className="text-green-500">
                  {totalCount}
                </span>
                )
              </strong>
            </>
          }
        </div>
      </div>


      {((totalCount && products.length) > 0) ?
        <div className="flex  flex-col gap-4">
          {products.map((product, idx) =>
            <Product
              key={product.id}
              {...product}
              number={idx + 1 + (currentPage - 1) * itemsPerPage}
              isSingle={false}
            />
          )
          }

        </div>
        : <div className="text-red-500 font-bold text-center">Not Tasks...</div>
      }
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalCount / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  )

}
