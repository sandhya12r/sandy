import { Webhook } from "svix"; 
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
interface VerifyResult {
  data: any;
  type: string;
}
export async function POST(req: NextRequest) {
    const wh = new Webhook(process.env.SIGNING_SECRET as string);
    const headerPayload = await headers();
    const svixHeaders = {
        "svix-id": headerPayload.get("svix-id") as string,
        "svix-timestamp": headerPayload.get("svix-timestamp") as string,
        "svix-signature": headerPayload.get("svix-signature") as string,
    };

    // Get payload and verify
    const payload = await req.json();
    const body = JSON.stringify(payload);
    const { data, type } = wh.verify(body, svixHeaders) as VerifyResult;

    // Save in DB
    const userData = {
        _id: data.id,
        email: data.email_addresses[0].email_address, // Fixed typo
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
    };

    await connectDB();
    switch(type){
        case 'userData.created':
            await User.create(userData);
            break;
            case 'userData.updated':
            await User.findByIdAndUpdate(data.id, userData);
            break;
            case 'userData.deleted':
            await User.findByIdAndDelete(data.id);
            break;
            default:
                break;
    }
    return NextResponse.json({message:"Event recieved"})
}
