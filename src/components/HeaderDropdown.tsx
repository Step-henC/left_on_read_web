

import Link from "next/link";
import { Button } from "@/components/ui/button"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";



export default function HeaderDropdown() {

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button className='self-center' variant='outline'> Help</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuItem>
                        <Link href={'/faq'}>Frequently Asked Questions</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>  
        </DropdownMenu>
    )
}