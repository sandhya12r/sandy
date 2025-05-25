import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const {userId} = getAuth(req)
        if(!userId){
            return NextResponse.json({success: false, message: "User not authenticated", })
        }
        await connectDB();
        const data = await Chat.find({userId});
        return NextResponse.json({success: true, data: data})
    } catch (error: any) {
        return NextResponse.json({success: false, message: error.message})
    }
}