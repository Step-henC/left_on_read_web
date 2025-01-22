import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef, useState } from "react";
import {toast} from 'react-hot-toast'
import { Skeleton } from "./ui/skeleton";
import { Loader2 } from "lucide-react";


type BookFormData = {
    accents: string,
    char_describe: string,
    gender: string
}
type BookCharacter = {
    gender: string,
    nativeLocale: string,
    bookFormData: BookFormData,
    voiceId: string
}
export default function Voiceover() {

   const [audioSrc, setAudioSrc] = useState("")
   const [isLoading, setIsLoading] = useState(false);
   const [charCount, setCharCount] = useState(0);
   const [value, setValue] = useState('')

   const audioSourceRef = useRef<HTMLAudioElement>(null);


    const bookCharacters = [
        {voiceId: 'en-US-natalie', gender: "female", nativeLocale: 'en-US'},
        {voiceId: 'en-US-cooper', gender: "male", nativeLocale: 'en-US'},

        {voiceId: 'en-UK-theo', gender: "male", nativeLocale: 'en-UK'},
        {voiceId: 'en-UK-ruby', gender: "female", nativeLocale: 'en-UK'},
   
        {voiceId: 'en-SCOTT-rory', gender: "male", nativeLocale: 'en-SCOTT'},
        {voiceId: 'en-SCOTT-emily', gender: "female", nativeLocale: 'en-SCOTT'},

        {voiceId: 'en-AU-kylie', gender: "female", nativeLocale: 'en-AU'},
        {voiceId: 'en-AU-harper', gender: "male", nativeLocale: 'en-AU'},

        {voiceId: 'en-IN-aarav', gender: "male", nativeLocale: 'en-IN'},
        {voiceId: 'en-IN-priya', gender: "female", nativeLocale: 'en-IN'},
    ]

    const accents = [
        {label: 'American', value: 'en-US'},
        {label: "British", value: "en-UK"},
        {label: "Scottish", value: "en-SCOTT"},
        {label: "Australian", value: "en-AU"}, 
        {label: 'Indian', value: 'en-IN'}
    ]

    const gender = [
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
    ]

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true) //set early here to prevent multiple enter button clicks

        const form = event.currentTarget
        const formData = new FormData(form)
        const bookFormData = Object.fromEntries(formData.entries()) as BookFormData
    
        const bookCharacter = bookCharacters.find((person) => person.nativeLocale === bookFormData.accents && person.gender === bookFormData.gender) ?? bookCharacters[0]
        const body: BookCharacter = {...bookCharacter, bookFormData};

        try {
            const response = await fetch('/api/voiceover', {method: form.method, body: JSON.stringify(body)});
            const {audioFile} = await response.json();
            if (!audioFile) {
                throw new Error('Cannot generate audio at this time. Please try again later')
            }
            setAudioSrc(audioFile)
        } catch(e) {
            toast.error('Cannot generate audio at this time. Please try again later')
            console.error(e)
            return
        } finally {
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
        <div>
            <form method='POST' onSubmit={handleSubmit}>
                <label  className='ml-4' htmlFor="accents">Character Accent:</label>
                <Select name="accents" defaultValue={accents[0].value}    >
                    <SelectTrigger id='accents' className='w-4/12 ml-3'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    {accents.map((val) => 
                        <SelectItem key={val.value} value={val.value}>{val.label}</SelectItem>                    
                    )}
                    </SelectContent>
                </Select>
                <br/>
                <label className='ml-4 mt-3' htmlFor="gender">Character Gender:</label>
                <Select name='gender' defaultValue={gender[0].value}>
                <SelectTrigger id='gender' className='w-4/12 ml-3 '>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    {gender.map((val) => 
                        <SelectItem  key={val.value} value={val.value}>{val.label}</SelectItem>                    
                    )}
                    </SelectContent>
                
                </Select>
                <Label htmlFor="char_describe"/>
                <Textarea maxLength={200} minLength={2} value={value} onChange={(e) => setValue(e.target.value)}required name='char_describe' id='char_describe' className="mt-4 ml-4 mb-0"/>
                <p className="place-self-end text-sm text-slate-500">{charCount} characters remaining</p>
                <Button disabled={isLoading || charCount > 198 || charCount <= 0} className="ml-4 mt-3 w-full" type='submit' >{isLoading ? <Loader2 className='animate-spin' /> : "Create Character Voice"}</Button>
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