export interface IProduct {
    id: number
    title: string
    price: string
    description?: string
    category: string
    image: string
    like?: boolean
    widthImage?: number
    heightImage?: number
    number?: number
    isSingle?: boolean
}

export interface IResponseProducts {
    products: IProduct[]
    totalCount?: number
}

export interface ICreateProduct {
    title: string
    price: string
    description?: string
    category: string
    image: string
    like?: boolean
}

export interface IUpdateProduct {
    id: number
    title: string
    price: string
    description?: string
    category: string
    like?: boolean
}


