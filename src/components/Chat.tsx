"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { Loader2 } from "lucide-react";
import { getAnswer } from "@/app/actions";

export default function Chat() {
      const [value, setValue] = useState<string>('');
      const [charCount, setCharCount] = useState(0);
      const [isLoading, setIsLoading] = useState(false);
      const [generatedAnswer, setGeneratedAnswer] = useState('')

      useEffect(() => {
        setCharCount(200 - value.length);
      }, [value])
      useEffect(() => {
        setIsLoading(generatedAnswer.length < 0)
        const aiBox = document.getElementById('ai-res-box');
          if (aiBox) {
              aiBox.scrollIntoView();
          }
      }, [generatedAnswer])
        return (
        <div className="flex flex-row min-h-6/12 justify-center items-center">
          <div className="grid m-10 gap-2 w-9/12 ">
            <Textarea  onChange={(e) => setValue(e.target.value)} value={value}className="h-[230px]" placeholder="What are some good adventure books..." />
            <p className="place-self-end text-sm text-slate-500">{charCount} characters</p>
            <Button disabled={isLoading} onClick={async () => {
              setIsLoading(true)
              const {text} = await getAnswer(value);
              setGeneratedAnswer(text)
            }}> {isLoading ?  <Loader2 className="animate-spin" /> : "Send message"}</Button>
            { generatedAnswer && <Textarea id='ai-res-box'  readOnly={true} value={generatedAnswer} className="h-[230px] mt-5" /> }

          </div>
          </div>
      
        )
}