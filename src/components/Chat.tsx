"use client"

import { useEffect, useState, useRef, ButtonHTMLAttributes } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {toast} from 'react-hot-toast'


import { Loader2 } from "lucide-react";
import { Progress } from "./ui/progress"

export default function Chat() {
      const [value, setValue] = useState<string>('');
      const [charCount, setCharCount] = useState(0);
      const [isLoading, setIsLoading] = useState(false);
      const [generatedAnswer, setGeneratedAnswer] = useState('');
      const [coolOff, setCoolOff] = useState(false);
      const [progress, setProgress] = useState(0);
      const timerRef = useRef(20);

      const askAI = async () => {
        if (charCount > 200 || charCount <= 2) {
          toast.error("Messages must be between 2 and 200 characters")
          return; 
        }
        setIsLoading(true)

       try {
        const res = await fetch('api/chat/', 
          {
            method: 'POST', 
            body: JSON.stringify({prompt: value.trim()})
          })

          const text = await res.json()

          setGeneratedAnswer(text.text)

       } catch (e) {
        toast.error(e)
       } finally{
        setIsLoading(false);
        setCoolOff(true);
       }

      }
    
      useEffect(() => {
        setCharCount(value.length > 200 ? 0 : 200 - value.length);
      }, [value])
      useEffect(() => {
        const aiBox = document.getElementById('ai-res-box');
          if (aiBox) {
              aiBox.scrollIntoView();
          }
      }, [generatedAnswer])

      const keyPressEnterSubmit = (e: KeyboardEvent) => {
        if (e.key == 'Enter' ) {
          const submitBtn = document.getElementById('cht-sbmt');
          if (submitBtn){
            submitBtn.click()
          }

        }
      }
      
      useEffect(() => {
        if (coolOff == false) return;
        const interval = setInterval(() => {
            setProgress((prev) => prev + 5);
            timerRef.current--;

            if (timerRef.current >= 0) {
            return;
          }
          setCoolOff(false)
          timerRef.current = 20;
          clearInterval(interval)
          setProgress(0)
        }, 1000)

        return () => {
          clearInterval(interval)
        }
      }, [coolOff])

      useEffect(() => {

        window.addEventListener("keydown", keyPressEnterSubmit);

        return () => {
          window.removeEventListener('keydown', keyPressEnterSubmit)
        }
      }, [])

        return (
         <div className="flex flex-row min-h-6/12 justify-center items-center">

          <div className="grid m-10 gap-2 w-9/12 ">
            <Label id='usr-lbl' htmlFor="user-message" >Your message </Label>
            <Textarea minLength={2} id="user-message" onChange={(e) => setValue(e.target.value)} value={value}className="h-[200px]" placeholder="What are some good adventure books..." />
            <p className="place-self-end text-sm text-slate-500">{charCount} characters remaining</p>
            <Button id='cht-sbmt' disabled={isLoading || coolOff || value.trim().length < 2} onClick={askAI}> {isLoading ?  <Loader2 className="animate-spin" /> : coolOff ? "Cooling off" : "Send message"}</Button>
            <div className="mt-2 w-full h-[50px]">
            {coolOff && (
              <Progress value={progress}/>
            )}
            </div>
            { generatedAnswer && (
              <>
                <Label htmlFor="ai-res-box" className="mt-1">AI Response</Label>
                <Textarea id='ai-res-box'  readOnly={true} value={generatedAnswer} className="h-[230px]" /> 
              </>
                )}

          </div>
          </div>
      
        )
}