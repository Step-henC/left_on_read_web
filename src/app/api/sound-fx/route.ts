import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){

    let statusCode = 200;
    try {
           const {sound_describe} = await req.json();
        
                if (!sound_describe) {
                    statusCode = 400;
                    throw new Error('improper request sent')
                }

                    const response = await fetch('https://api.elevenlabs.io/v1/sound-generation', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json', 
                            "xi-api-key": process.env.ELEVENLABS_API_KEY!
                        },
                        body: JSON.stringify({text: sound_describe, duration_seconds: 5.0})
                    })

                    if (!response.ok) {
                        throw new Error(`Failed to fetch: ${response.status}`);
                      }

                    const headers = new Headers()
                    headers.append('Content-Disposition', 'attachment; filename="user-fx.mpeg')
                    headers.append('Content-Type', 'audio/mpeg')
                      
                    const blob = await response.blob()
                    const buff = await blob.arrayBuffer();
                    const resBuff = Buffer.from(buff)


                    return new Response(resBuff, {headers})
      

    } catch (error) {
        return NextResponse.json({error: 'cannot create voiceover'}, {status: statusCode})
    }

}