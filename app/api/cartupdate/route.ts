import connectDB from "@/app/Database/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function POST(request:any) {
    await connectDB();
    try {
        const email = request.headers.get('email');
        const { cartitems } = await request.json();
        if (!email || !cartitems) {
            return NextResponse.json({ success: false, message: 'Email and cartitems are required' }, { status: 400 });
        };
        const user = await User.findOneAndUpdate(
            { email },
            { cartitems },
            { new: true }
        );
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
        const err= error as Error;
        return NextResponse.json({ success: false, error: err.message }, { status: 400 });
    }
}
export async function GET(request:any) {
    await connectDB()
    try {
        const email = request.headers.get('email');
        if (!email) {
            return NextResponse.json({ success: false, message: 'Email not provided' }, { status: 400 });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ success: false, message: `No user found with email ${email}` }, { status: 404 });
        }
        return NextResponse.json({ success: true, found_user: user }, { status: 200 });
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ success: false, error: err.message }, { status: 400 });
    }
}