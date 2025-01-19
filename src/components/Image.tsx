"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {toast} from 'react-hot-toast'

import { Loader2 } from "lucide-react";
import { Progress } from "./ui/progress"



export default function Imagery() {

    const [value, setValue] = useState<string>('');
    const [charCount, setCharCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [src, setSrc] = useState<string>('');
    const [coolOff, setCoolOff] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef(20);

    const askAI = async() => {
        setIsLoading(true);
        try {
          const res = await fetch('api/image/', 
            {
              method: 'POST', 
              body: JSON.stringify({prompt: value.trim()})
            })
  
            const body = await res.json()
            setSrc(body.images.data[0].url)
        } catch (e) {
            toast.error(e);
            return;
        } finally {
            setIsLoading(false);
            setCoolOff(true);
        }
    }

    // useEffect(() => {
    //     if (src) {
    //         const img = document.createElement('image');
    //         img.setAttribute('src', `data:image/jpg;base64,${src}`)
    //         img.setAttribute('alt', 'some alt')
    //         document.appendChild(img)
    //     }
    // }, [src])

    return (
        <div className="flex flex-row min-h-6/12 justify-center items-center">

        <div className="grid m-10 gap-2 w-9/12 ">
          <Label id='usr-lbl' htmlFor="user-message" >Your message </Label>
          <Textarea minLength={2} id="user-message" onChange={(e) => setValue(e.target.value)} value={value}className="h-[200px]" placeholder="Imagine a leviathan based on the following description..." />
          <p className="place-self-end text-sm text-slate-500">{charCount} characters</p>
          <Button id='cht-sbmt' disabled={isLoading || coolOff || value.trim().length < 2} onClick={askAI}> {isLoading ?  <Loader2 className="animate-spin" /> : coolOff ? "Cooling off" : "Send message"}</Button>
          <div className="mt-2 w-full h-[50px]">
          {coolOff && (
            <Progress value={progress}/>
          )}
          </div>
       {src !== '' && <img src={src} alt={"AI generated image"} />} 
        </div>
        </div>
    )
}