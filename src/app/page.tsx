"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Chat from '../components/Chat';
import Imagery from "@/components/Image";
import Audio from "@/components/Audio";
import Video from "@/components/Video";

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
      <div className="w-[80%] flex flex-col  h-2/12 m-10 p-2 justify-items-center align-items-center">
        <h2 className="text-5xl"><strong>Join book lovers around the world using AI to engage in their favorite books</strong></h2>
          <br />
          <br />
          <p className="text-3xl"> Probe AI for book suggestions, or image creation and sound effects from book passages.
                                   Try for free and subscribe to continue service.</p>
      </div> 
        <Tabs className="w-[70%] self-center" defaultValue="chat_book" >
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="chat_book">Chat</TabsTrigger>
            <TabsTrigger value="imagery">Imagery</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>

          </TabsList>
          <TabsContent value="chat_book">
            <Chat/>
          </TabsContent>
          <TabsContent value="imagery"><Imagery /></TabsContent>
          <TabsContent value="audio"><Audio /></TabsContent>
          <TabsContent value="video"><Video /></TabsContent>
        </Tabs>
    </div>
  );
}
