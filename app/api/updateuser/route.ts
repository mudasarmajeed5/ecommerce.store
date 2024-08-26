import connectDB from "@/app/Database/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
export async function POST(req:any) {
    await connectDB();
  
    try {
      const { email, address } = await req.json();
      const user = await User.findOneAndUpdate(
        { email },
        { address },
        { new: true } 
      );
      if (!user) {
        return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
      const err = error as Error;
      return NextResponse.json({ success: false, error: err.message }, { status: 400 });
    }
  }