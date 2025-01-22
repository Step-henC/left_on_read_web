
"use client"

import { useEffect, useState, useRef, ButtonHTMLAttributes } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {toast} from 'react-hot-toast'
import { Skeleton } from "./ui/skeleton";



import { Loader2 } from "lucide-react";
import { Progress } from "./ui/progress"
import { fileURLToPath } from "url"


export default function SoundEffects() {
    const [value, setValue] = useState<string>('');
    const [charCount, setCharCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [generatedAnswer, setGeneratedAnswer] = useState('');
    const [coolOff, setCoolOff] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef(20);
    const [audioSrc, setAudioSrc] = useState("")

    const audioSourceRef = useRef<HTMLAudioElement>(null);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await fetch('/api/sound-fx', {method: "POST", body: JSON.stringify({sound_describe: value}) })

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status}`);
              }
            
              const audioFileBlob = await response.blob()

              const url = URL.createObjectURL(audioFileBlob)
              
            setAudioSrc(url);

        } catch (e) {
            toast.error("Cannot generate sound effects at this time");
            console.log(e);
            return;
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // if user requests another audio after an existing audio
        if (audioSourceRef.current && audioSrc) {
            audioSourceRef.current.src = audioSrc
            audioSourceRef.current.load()
        }
    }, [audioSrc])

    useEffect(() => {
        setCharCount(value.length > 200 ? 0 : 200 - value.length);
      }, [value])

    return (
            <div className="flex flex-col gap-2 ml-3 ">
                <form method="POST" onSubmit={handleSubmit}>
                    <Label className="mt-3" htmlFor="sound-describe" >Your sound effects description</Label>
                    <Textarea value={value} onChange={(e) => setValue(e.target.value)} required id="sound-describe" name="sound-describe" />
                    <p className="place-self-end text-sm text-slate-500">{charCount} characters remaining</p>

                    <Button disabled={isLoading || charCount > 198 || charCount <= 0} className="w-full mt-4" type="submit" >{isLoading ? <Loader2 className="animate-spin"/> : "Create Sound Effects"} </Button>
                </form>

                <div className="ml-4 mt-3 ">
                { audioSrc !== '' &&
                     <audio  ref={audioSourceRef} controls >
                        <source  src={audioSrc} type='audio/mpeg' />
                            This browser does not support audio play
                    </audio>
                }
                {isLoading && !audioSrc && <Skeleton className="h-[100px] w-[400px] rounded-3xl"/>}
            </div>
            </div>
    )
}