"use server"

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/app/auth';

interface cartItemType {
  id: string;
  quantity: number;
  name?: string;
  description?: string;
  price?:number 
}

export async function POST(req: NextRequest) {

    const session = await auth();
    if(!session?.user?.id){
        return NextResponse.json({error:"User not authenticated"},{status:401})
    }
    const userId = session.user.id;
    try {
        const body = await req.json();
        const { id:productId, quantity:newQuantity ,name ,description ,price } = body as cartItemType;

        if (!productId || typeof newQuantity !== 'number' || newQuantity < 1) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        let cart = await prisma.cart.findUnique({
            where:{userId:userId}
        })

        if(!cart){
            cart = await prisma.cart.create({
                data:{userId:userId}
            })
        }

        const existingItem = await prisma.cartItem.findUnique({
            where:{cartId_productId:{cartId:cart.id,productId:productId}}
        })


        if(existingItem){
            await prisma.cartItem.update({
                where:{id:existingItem.id},
                data:{quantity:newQuantity}
            })
        }else{
             await prisma.cartItem.create({
     data: {
      cartId: cart.id,
      productId: productId,
      quantity: newQuantity,
    }
  });
        }
        return NextResponse.json(
            { message: 'Item added to cart', item: { productId, newQuantity } },
            { status: 201 }
        );

    } catch (err) {
  const error = err as Error;
  return NextResponse.json({ error: error.message || 'Invalid request' }, { status: 400 });
}

}