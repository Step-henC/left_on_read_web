import { getAnswer } from "@/app/actions";
import { NextResponse } from "next/server";



export async function POST(req: Request, res: Response) {

    try {
    const {prompt} =  await req.json()

    if (!prompt) {
        return NextResponse.json({error: 'improper request'}, {status: 400});
    }

    const {text, finishReason, usage} = await getAnswer(prompt);

    return NextResponse.json({text, finishReason, usage}, {status: 200})

} catch (e) {
    console.log(e)
    return NextResponse.json({error: 'cannot process request'}, {status: 500})
}
}