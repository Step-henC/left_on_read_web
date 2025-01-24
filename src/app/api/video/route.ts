import { NextResponse } from "next/server";

import {LumaAI } from 'lumaai'
const client = new LumaAI({
    authToken: process.env.LUMA_API_KEY!
  });


export async function POST(req: Request, res: Response) {

    
    let statusCode = 200;

   

    try {
        const {video_describe} = await req.json();

        if (!video_describe) {
            statusCode = 400;
            throw new Error("improper request sent")
        }

     
        let generation = await client.generations.create({
            prompt: video_describe,
            loop: true
        })

        if (!generation) {
            throw new Error('cannot generate video')
            statusCode = 500;
        }
        let completed = false;

        while (!completed) {
            generation = await client.generations.get(generation.id as string);
    
            if (generation.state === "completed") {
                completed = true;
            } else if (generation.state === "failed") {
                 statusCode = 500;
                throw new Error(`Generation failed: ${generation.failure_reason}`);
               
            } else {
                console.log("Dreaming...");
                await new Promise(r => setTimeout(r, 3000)); // Wait for 3 seconds
            }
        }
    
        const videoUrl = generation?.assets?.video as string;
    
        
        return NextResponse.json({url: videoUrl, id: generation.id})
       

    } catch (e) {
        return NextResponse.json({error: 'cannot generate video'}, {status: statusCode})
    }
}