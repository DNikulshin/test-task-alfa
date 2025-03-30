import { prismaClient } from '@/shared/lib/prismaClient'
import { ICreateProduct } from '@/types/types';

export async function GET(req: Request): Promise<Response> {
    try {
        const url = new URL(req.url)
        const pageParam = url.searchParams.get('page')
        const limitParam = url.searchParams.get('limit')
        const filterParam = url.searchParams.get('filter')

        const page = pageParam ? parseInt(pageParam) : 1
        const limit = limitParam ? parseInt(limitParam) : undefined

        const skip = (page - 1) * (limit || 0)

        const totalCount = await prismaClient.product.count()

        const products = await prismaClient.product.findMany({
            where: { like: filterParam ? !!filterParam : undefined },
            orderBy: [{ createdAt: 'desc' }],
            skip: limit ? skip : undefined,
            take: limit
        })

        return new Response(JSON.stringify({ products, totalCount }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        throw new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

export async function POST(req: Request) {
    try {

        const newPost: ICreateProduct = await req.json()

        const task = await prismaClient.product.create({
            data: { ...newPost }
        })

        return new Response(JSON.stringify(task), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        })

    } catch (error) {

        throw new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        })

    }
}




