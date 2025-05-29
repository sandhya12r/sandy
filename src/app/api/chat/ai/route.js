export const maxDuration = 60;
import OpenAI from "openai";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Chat from "@/models/Chat";
import connectDB from "@/config/db";

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY
});

export async function POST(req){
    try {
        const {userId} = getAuth(req)
        const {chatId, prompt} = await req.json();
        if(!userId){
            return NextResponse.json({success: false, message: "User not authenticated", })
        }
        await connectDB();
        const data = await Chat.findOne({_id: chatId, userId});

        const userPrompt = {
            role: "user",
            content: prompt,
            timestamp: Date.now(),
        };

        data.messages.push(userPrompt);

        async function main() {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "deepseek-chat",
            store: true
        });

        const message = completion.choices[0].message;
        message.timestamp = Date.now();

        data.messages.push(message);
     data.save();

     return NextResponse.json({success: true, data: data})
}

    } catch (error) {
        return NextResponse.json({success: false, error: error.message})
    }
}