'use client'
import { Product } from "@/components/Product"
import { useStore } from "@/store/store"
import { useEffect } from "react"

export default function ProductsPage() {
  const products = useStore(state => state.products)
  const getProducts = useStore(state => state.getProducts)
  const isLoading = useStore(state => state.isLoading)
  const isError = useStore(state => state.isError)

  useEffect(() => {
    getProducts()
  }, [getProducts])


  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1>Products {products?.length > 0 && <strong>(<span className="text-green-500">{products?.length}</span>)</strong>}</h1>
      {products.length > 0 ?
        <div className="flex  flex-col gap-4">
          {products.map((product, idx) =>
            <Product
              key={product.id}
              {...product}
              number={idx + 1}
              isSingle={false}
            />
          )
          }
        </div>
        : <div className="text-red-500 font-bold">Not Tasks...</div>
      }
    </div>
  )

}
