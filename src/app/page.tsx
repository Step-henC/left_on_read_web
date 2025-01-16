"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import Chat from './components/Chat';
import { LogInIcon } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import readLogo from './dark_left_logo.003.jpeg'
import lightLogo from './left_on_read_logo.001.jpeg'
export default function Home() {

  const handleOnClick = async () => {
    try {
      const res = await fetch('api/stripe', {
        method: "GET",
  
      }).then((res) => res.json())
  
      window.location.href = res?.url;
    } catch (error) {
      console.log("Cannot subscribe", error)
    }
 
  }

 
  return (
    <div className="flex flex-col h-screen w-screen">

   <div id='header' className="inset-x-0 top-0 flex h-20 justify-between align-center bg-white" >
    <Image loading="lazy"  className="ml-10" src={lightLogo} alt="Left on read logo" width={80} height={18}/>
    <Button className="self-center mr-10"  variant={'outline'}>Login<LogInIcon /></Button>
   </div>
   <div className="w-[80%] flex flex-col  h-2/12 m-10 p-2 justify-items-center align-items-center">
    <h2 className="text-5xl"><strong>Join book lovers around the world engaging in their favorite books </strong></h2>
      <br />
      <br />
     <p className="text-3xl"> Probe AI for book suggestions, or image creation and sound effects from book passages.
      Start for free and subscribe for continued service.</p>
   </div>
   
   <Tabs className="w-[70%] self-center" defaultValue="chat_book" >
    <TabsList className="grid grid-cols-3">
      <TabsTrigger value="chat_book">Chat</TabsTrigger>
      <TabsTrigger value="visualize">Visualize</TabsTrigger>
      <TabsTrigger value="audio">Audio</TabsTrigger>
   </TabsList>
    <TabsContent value="chat_book">
      <Chat/>
    </TabsContent>
    <TabsContent value="visualize">Change your password here.</TabsContent>
    <TabsContent value="audio">Check audio here.</TabsContent>
</Tabs>

</div>
  );
}
