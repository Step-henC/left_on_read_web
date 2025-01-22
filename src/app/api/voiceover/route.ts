import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){

    let statusCode = 200;
    try {
           const {bookFormData, voiceId, nativeLocale} = await req.json();
        
                if (!bookFormData) {
                    statusCode = 400;
                    throw new Error('improper request sent')
                }
                
                let data = JSON.stringify({
                    "voiceId": voiceId,
                    "style": "Conversational",
                    "text": `${bookFormData.char_describe}`,
                    "rate": 0,
                    "pitch": 0,
                    "sampleRate": 48000,
                    "format": "MP3",
                    "channelType": "MONO",
                    "pronunciationDictionary": {},
                    "encodeAsBase64": false,
                    "variation": 1,
                    "audioDuration": 0,
                    "modelVersion": "GEN2",
                    "multiNativeLocale": nativeLocale,
                  });
                  
                  let config = {
                    method: 'POST',
                    headers: { 
                      'Content-Type': 'application/json', 
                      'Accept': 'application/json',
                      'api-key': process.env.MURFAI_API_KEY!
                    },
                    body: data,
                  };
                  

                
                    const audio = await fetch('https://api.murf.ai/v1/speech/generate', config)

                  
                    const audioResult = await audio.json();

                    if (!audioResult) {
                      throw new Error("cannot communicate with voice AI")
                    }
                    
                    const {audioFile} = audioResult;
              
          return NextResponse.json({audioFile}, {status: statusCode})

    } catch (error) {
        return NextResponse.json({error: 'cannot create voiceover'}, {status: statusCode})
    }

}