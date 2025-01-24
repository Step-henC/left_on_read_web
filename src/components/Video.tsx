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


export default function Video() {

    const [value, setValue] = useState<string>('');
    const [charCount, setCharCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [generatedAnswer, setGeneratedAnswer] = useState('');
    const [coolOff, setCoolOff] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef(20);
    const [videoSrc, setVideoSrc] = useState("")
    const videoRef = useRef<HTMLVideoElement>(null)


    useEffect(() => {
        // if user requests another audio after an existing audio
        if (videoRef.current && videoSrc) {
            videoRef.current.src = videoSrc
            videoRef.current.load()
        }
    }, [videoRef])

    
    useEffect(() => {
        setCharCount(value.length > 200 ? 0 : 200 - value.length);
      }, [value])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await fetch('/api/video', {method: "POST", body: JSON.stringify({video_describe: value}) })

            const body = await response.json()
            if (!body || !response.ok) {
                throw new Error('Cannot generate video')
            }
        //      const fileStream = fs.createWriteStream(`${body.id}.mp4`);
        // await new Promise((resolve, reject) => {
        //     response?.body?.pipe(fileStream);
        //     response?.body?.on('error', reject);
        //     fileStream.on('finish', resolve);
        // });
    
        // console.log(`File downloaded as ${body.id}.mp4`);
            setVideoSrc(body.url)
    

        } catch (e) {
            toast.error("Cannot generate video at this time");
            return;
        } finally{
            setIsLoading(false)
        }
    }
    return (
        <div className="flex flex-col gap-2 ml-3 ">
        <form method="POST" onSubmit={handleSubmit}>
            <Label className="mt-3" htmlFor="video-describe" >Your video description</Label>
            <Textarea value={value} onChange={(e) => setValue(e.target.value)} required id="video-describe" name="video-describe" />
            <p className="place-self-end text-sm text-slate-500">{charCount} characters remaining</p>

            <Button disabled={isLoading || charCount > 198 || charCount <= 0} className="w-full mt-4" type="submit" >{isLoading ? <Loader2 className="animate-spin"/> : "Generate Video"} </Button>
        </form>

        <div className="ml-4 mt-3 flex flex-row align-items-center justify-center">
        { videoSrc && <video ref={videoRef} width={500} height={500} controls>
            <source src={videoSrc} />
            This browser does not support the video tag.
        </video>
        }
        {isLoading && !videoSrc && <Skeleton className="h-[100px] w-[400px] rounded-3xl"/>}
    </div>
    </div>
    )
}