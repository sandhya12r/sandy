import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const {userId} = getAuth(req)
        if(!userId){
            return NextResponse.json({success: false, message: "User not authenticated", })
        }
    // data save
    const chatData ={
        userId,
        messages: [],
        name:"New Chat",
    };

    //connect db
    await connectDB();
    await Chat.create(chatData);

    return NextResponse.json({success: true, message:"Chat Created"})
    } 
    
    catch(error: any)
    {
        return NextResponse.json({success: false, message: error.message})
    }
}