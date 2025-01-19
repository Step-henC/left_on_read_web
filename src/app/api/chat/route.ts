import { NextResponse } from "next/server";
import {generateText} from 'ai'
import { createOpenAI } from "@ai-sdk/openai";


export async function POST(req: Request, res: Response) {
    let statusCode = 400;
    try {
    const {prompt} =  await req.json()

    if (!prompt) {
        statusCode = 400;
        throw new Error('improper request from client')
    }

    const openai = createOpenAI({
        apiKey: process.env.OPENAI_API_KEY!
    })
      const system = `AI assistant is an experienced librarian with human-like artificial intelligence with extensive knowledge of books and novels.
          AI is a well-behaved and well-mannered individual.
          AI is always friendly, kind, and inspiring and he is eager to provide vivid and thoughtful responses to the users about books and novels.
          AI has the sum of all knowledge in their brain and is able to answer any questions about books and novels.
          AI never creates images or provides websites links.
          AI loves books and novels, and loves to share knowledge on books.
          If the context does not provide the answer to the question, the AI assistant will say, "I'm sorry, but I don't know the answer"`

    const {text, finishReason, usage} = await generateText({
        model: openai('gpt-4o-mini-2024-07-18'), //more affordable, takes image inputs, 
        prompt,
        system,
        maxTokens: 2000,
    })

    if (!text) {
        statusCode = 500;
        throw new Error('cannot chat with AI')
    }

    return NextResponse.json({text, finishReason, usage}, {status: 200})

} catch (e) {
    console.log(e)
    return NextResponse.json({error: e}, {status: statusCode})
}
}