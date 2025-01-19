"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {toast} from 'react-hot-toast'

import { Loader2 } from "lucide-react";
import { Progress } from "./ui/progress"
import Image from "next/image"



export default function Imagery() {

    const [value, setValue] = useState<string>('');
    const [charCount, setCharCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [src, setSrc] = useState<string>('');
    const [coolOff, setCoolOff] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef(20);

    const loader = () => {
      return `${src}`
    }

    const askAI = async() => {
      if (charCount < 2 || charCount > 200) {
        toast.error("Descriptions must be between 2 and 200 characters");
        return;
      }
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

    const keyPressEnterSubmit = (e: KeyboardEvent) => {
      if (e.key == 'Enter' ) {
        const submitBtn = document.getElementById('cht-sbmt');
        if (submitBtn){
          submitBtn.click()
        }

      }
    }

    useEffect(() => {
      setCharCount(value.length > 200 ? 0 : 200 - value.length);
    }, [value])

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
          <Label id='usr-lbl' htmlFor="user-message" >Your description</Label>
          <Textarea minLength={2} id="user-message" onChange={(e) => setValue(e.target.value)} value={value}className="h-[150px]" placeholder="Imagine a leviathan based on the following description..." />
          <p className="place-self-end text-sm text-slate-500">{charCount} characters</p>
          <Button id='cht-sbmt' disabled={isLoading || coolOff || value.trim().length < 2} onClick={askAI}> {isLoading ?  <Loader2 className="animate-spin" /> : coolOff ? "Cooling off" : "Send description"}</Button>
          <div className="mt-2 w-full h-[50px]">
          {coolOff && (
            <Progress value={progress}/>
          )}
          </div>
       {src === '' ? (<div className="mt-3 bg-slate-300 w-[200px] h-[200px] flex items-center justify-center">
              200 x 200
             </div>) :
            (<Image loader={loader} height={200} width={200} src={src} alt={"AI generated image"} />)
      } 
        </div>
        </div>
    )
}