import { prismaClient } from '@/shared/lib/prismaClient'
import { IUpdateProduct } from '@/types/types';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
    try {

        const { id } = await params

        if (!id) {
            return new Response(JSON.stringify({ error: 'Product ID is required' }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            })
        }

        const product = await prismaClient.product.findFirst({ where: { id: +id } })

        
        if (!product) {
            return new Response(JSON.stringify({ error: 'Product not found' }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            })
        }

        return new Response(JSON.stringify(product), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        throw new Response(JSON.stringify(error), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        })
    }
}

export async function PATCH(req: Request) {
    try {

        const updatePost: IUpdateProduct = await req.json()



        const task = await prismaClient.product.update({
            where: {
                id: updatePost.id
            },
            data: { ...updatePost }
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

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        const { id } = await params

        if (!id) {
            return new Response(JSON.stringify({ error: 'Product ID is required' }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const task = await prismaClient.product.delete({
            where: { id: +id }
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


