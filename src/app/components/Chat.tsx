"use client"

import { useEffect, useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"


export default function Chat() {
      const [value, setValue] = useState('');
      const [charCount, setCharCount] = useState(0);

      useEffect(() => {
        setCharCount(200 - value.length);
      }, [value])
        return (
        <div className="flex flex-row min-h-6/12 justify-center items-center">
          <div className="grid m-10 gap-2 w-9/12 h-full">
            <Textarea  onChange={(e) => setValue(e.target.value)} value={value}className="h-[230px]" placeholder="What are some good adventure books..." />
            <p className="place-self-end text-sm text-slate-500">{charCount} characters</p>
            <Button>Send message</Button>
          </div>
          </div>
      
        )
}