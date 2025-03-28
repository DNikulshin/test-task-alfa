'use client'
import { FormCreateProduct } from "@/components/FormCreateProduct"
import { Modal } from "@/components/Modal"
import { Pagination } from "@/components/Pagination"
import { Product } from "@/components/Product"
import { useProductStore } from "@/store/store"
import { useEffect, useState } from "react"

export default function ProductsPage() {
  const [isVisibleForm, setIsVisibleForm] = useState(false)
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
  }

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (isError) {
    return <div className='text-red-500 text-center'>Error</div>
  }

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <div className="flex justify-center items-center w-full gap-6">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1 bg-stone-900"
        >
          <option value="">All Products</option>
          <option value="like">like</option>
        </select>
        <button className=' bg-green-500 px-2 py-1 rounded-sm cursor-pointer text-md'
          onClick={() => setIsVisibleForm(!isVisibleForm)}
        >
          {isVisibleForm ? 'Close' : 'Create'}
        </button>


        {
          isVisibleForm &&
          <Modal isVisible={setIsVisibleForm}>
            <FormCreateProduct onClose={() => setIsVisibleForm(false)} />
          </Modal>
        }

        <div className="flex items-center justify-center gap-2">

          {(totalCount  > 0) &&
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


      {(totalCount > 0) ?
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
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
        : <div className="text-red-500 font-bold">Not Tasks...</div>
      }
    </div>
  )

}
