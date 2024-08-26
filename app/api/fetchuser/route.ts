import connectDB from "@/app/Database/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
export async function GET(req:any) {
    await connectDB();
    try {
      const email = req.headers.get('email');
      if (!email) {
        return NextResponse.json({ success: false, message: 'Email not provided' }, { status: 400 });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return NextResponse.json({ success: false, message: `No user found with email ${email}` }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, found_user: user }, { status: 200 });
    } catch (error) {
      const err =  error as Error
      return NextResponse.json({ success: false, error: err.message }, { status: 400 });
    }
  }
  