import connectDB from "@/app/Database/mongodb";
import Products from "@/app/models/Products"
import { v4 } from "uuid";
import { NextResponse } from "next/server";
export async function POST(request: any) {
    await connectDB();
    try {
        const productData = await request.json();

        if (!productData) {
            return NextResponse.json({ status: 404, success: false, message: "Products Was not sent correctly" })
        }
        if (productData) {
            const Data = productData.Form;
            const PushProduct = new Products({
                id: v4(),
                title: Data.title,
                price: Number(Data.price),
                desc: Data.desc,
                image: Data.image,
                tag: Data.tag,
                Stock: Number(Data.stock),
                isAvailable: true,
            })
            PushProduct.save();
        }
        return NextResponse.json({ status: 200, message: "okay", success: true });
    }

    catch (error) {
        const err = error as Error;
        return NextResponse.json({ success: false, error: err.message }, { status: 400 });
    }
}
export async function GET(request: any) {
    await connectDB();
    try {
        let Products_Data = await Products.find();
        return NextResponse.json({ status: 200, message: 'Okay', foundData: Products_Data })
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ message: err.message })
    }
}
export async function PUT(request: any) {
    await connectDB();
    try {
        const body = await request.json();
        if(body.hasOwnProperty('Data')){
            const {id, Data } = body;
            const data = Data;

            if (data.price) {
                data.price = Number(data.price);
            }
            if (data.Stock) {
                data.Stock = Number(data.Stock);
            }
            const updatedProduct = await Products.findOneAndUpdate(
                { id },
                { $set: data },
                { new: true }
            );
            if (!updatedProduct) {
                return NextResponse.json({ status: 404, message: 'Product not found' });
            }
    
            return NextResponse.json({ status: 200, message: 'Product updated successfully', updatedProduct });
        } 
        if (body.hasOwnProperty('isAvailable')) {
            const { id, isAvailable } = body;
            const updatedProduct = await Products.findOneAndUpdate(
                { id },
                { $set: { isAvailable } },
                { new: true }
            );
            
            if (!updatedProduct) {
                return NextResponse.json({ status: 404, message: 'Product not found' });
            }

            return NextResponse.json({
                status: 200,
                message: 'Product availability updated successfully',
                updatedProduct
            });
        }
        
        }
        catch (error) {
            const err = error as Error;
            return NextResponse.json({ status: 500, message: err.message });
        }
}