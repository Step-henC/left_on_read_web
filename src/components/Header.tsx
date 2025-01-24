"use client"

import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import lightLogo from '../../public/left_on_read_logo.001.jpeg'
import HeaderDropdown from './HeaderDropdown';


type Props = {
    children: React.ReactNode
    }
export default function Header({children}: Props) {


    return (
        <>
            <div id='header' className="inset-x-0 top-0 flex h-20 justify-between align-center bg-white" >
                <Image loading="lazy"  className="ml-10" src={lightLogo} alt="Left on read logo" width={80} height={18}/>
                <HeaderDropdown />
                <Button className="self-center mr-10"  variant={'outline'}>Login<LogInIcon /></Button>
            </div>
            {children}
       </>
    )
}