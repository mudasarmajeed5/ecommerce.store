import connectDB from "@/Database/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
export async function POST(req) {
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
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  }
  
  // Handle other methods (if necessary, here we just disallow them)
  export async function GET() {
    return NextResponse.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }
  
  export async function PUT() {
    return NextResponse.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }
  
  export async function DELETE() {
    return NextResponse.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }