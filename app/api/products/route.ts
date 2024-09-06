import connectDB from "@/app/Database/mongodb";
import Products from "@/app/models/Products"
import { v4 } from "uuid";
import { NextResponse } from "next/server";
export async function POST(request:any){
    await connectDB();
    try{
        const email = request.headers.get('email')
        const productData = await request.json();

        if (!productData){
            return NextResponse.json({status:404,success:false,message:"Products Was not sent correctly"})
        }
        if(productData){
            const Data= productData.Form;
            const PushProduct= new Products({
                id:v4(),
                title:Data.title,
                price:Number(Data.price),
                desc:Data.desc,
                image:Data.image,
                tag:Data.tag    
            })
            PushProduct.save();
        }
        return NextResponse.json({status:200,message:"okay",success:true});
        }
    
    catch (error) {
        const err = error as Error;
        return NextResponse.json({ success: false, error: err.message }, { status: 400 });
    }
}
export async function GET(request:any){
    await connectDB();
    try {
        let Products_Data = await Products.find();
        return NextResponse.json({status:200,message:'Okay',foundData:Products_Data})
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({message:err.message})
    }
}