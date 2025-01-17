"use server"

import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
export async function getAnswer(question: string) {
    try {
      
        const openai = createOpenAI({
          apiKey: process.env.OPENAI_API_KEY!
      })
const prompt = `AI assistant is an experienced librarian with human-like artificial intelligence with extensive knowledge of books and novels.
            AI is a well-behaved and well-mannered individual.
            AI is always friendly, kind, and inspiring and he is eager to provide vivid and thoughtful responses to the uers about books and novels.
            AI has the sum of all knowledge in their brain and is able to answer any questions about books and book recommendations.
            AI never creates images or provides websites links.
            AI loves books and novels, and loves to share knowledge on books.
            If the context does not provide the answer to the question, the AI assistant will say, "I'm sorry, but I don't know the answer"
            AI will put forth the best effort in answering the following question:
            -----------------------------------
            QUESTION: ${question}
            `
  const {text, finishReason, usage} = await generateText({
    model: openai('gpt-4o'),
    prompt,
  });

  return {text, finishReason, usage}
  } catch (e) {
    console.log(e)
      return {text: '', finishReason: null, usage: null}
  } 
}