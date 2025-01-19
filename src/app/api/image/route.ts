import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";


export async function POST(req: NextRequest, res: NextResponse) {
    let statusCode = 400;

    try {
        

        const {prompt} = await req.json();

        if (!prompt) {
            statusCode = 400;
            throw new Error('improper request sent')
        }
    
        const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY!});

  
  
  const images = await openai.images.generate({
    model: 'dall-e-2',
    prompt,
    n: 1,
    size: '512x512',
    
  })

  if (!images){
    statusCode = 500;
    throw new Error('cannot generate images')
  }
  
  return NextResponse.json({images}, {status: 200})
  } catch (e) {
    console.log(e)
      return NextResponse.json({error: e}, {status: statusCode})
  } 
}