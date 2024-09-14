'use server'
import { NextResponse } from "next/server";
import connectDB from "@/app/Database/mongodb";
import Products from "@/app/models/Products"
export async function POST(request: Request) {
    await connectDB();
    try {
        const { id } = await request.json();
        const product = await Products.findById(id);
        if (!product) {
            return NextResponse.json({ status: 404, message: 'Product not found' });
        }
        return NextResponse.json({ status: 200, message: 'Product found', product });
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ status: 500, message: err.message });
    }
}