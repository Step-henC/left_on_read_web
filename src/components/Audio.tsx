"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import Voiceover from "./Voiceover"
import SoundEffects from "./SoundEffects"

type SoundOptions = "voiceover" | "sound-fx"
export default function Audio() {

    const [selected, setSelected] = useState<SoundOptions>('voiceover')

    return (
        <div className="flex flex-row items-start justify-start w-full h-full">
            <div id='btn-select' className="flex flex-col gap-2 m-3 w-4/12 h-full">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={selected === 'sound-fx' ? "default" : "outline"}className="max-[900px]:text-xs" onClick={() => setSelected('sound-fx')}>
                                Sound Effects
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Hear AI generated audio of the author's auditory descriptions</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={selected === 'voiceover' ? "default" : "outline"} onClick={() => setSelected('voiceover')}>
                            Voiceover
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Enter description of the characters to hear their AI generated voices</p>
                    </TooltipContent>
                </Tooltip>       
            </TooltipProvider>   
            </div>
            <div className="flex flex-col w-8/12 justify-center align-center">
            { selected === 'voiceover' && <Voiceover />}
            { selected === 'sound-fx' && <SoundEffects />}
            </div>     
        </div>
    )
}