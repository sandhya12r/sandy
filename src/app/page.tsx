'use client';

import { MenuIcon, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import PromptBox from "@/components/PromptBox";
import Message from "@/components/Message";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedChat } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when selectedChat updates
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [selectedChat]);

  const messages = selectedChat?.messages || [];

  return (
    <div className="flex h-screen">
      <Sidebar expand={expand} setExpand={setExpand} />
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
        <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
          <span><MenuIcon onClick={() => setExpand(prev => !prev)} /></span>
          <span><MessageCircle /></span>
        </div>

        {messages.length === 0 ? (
          <>
            <div className="flex items-center gap-3">
              <Image className="h-12 w-12" src={"/logo.png"} alt="logo" width={200} height={200} />
              <p className="text-2xl font-medium">Hi, I am Sandy.</p>
            </div>
            <p className="text-base mt-2">How can I Help you today?</p>
          </>
        ) : (
          <div
            className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto"
            ref={containerRef}
          >
            <p className="fixed top-8 border border-transparent hover:border-gray-500/50 py-1 px-2 rounded-lg font-semibold mb-6">
              {selectedChat?.name}
            </p>

            {messages.map((msg: { role: string; content: string }, index:number) => (
  <Message key={index} role={msg.role} content={msg.content} />
))}
            {isLoading && (
              <div className="flex gap-4 max-w-3xl w-full py-3">
                <Image
                  src={"/sandy.png"}
                  alt="logo"
                  className="h-9 w-9 p-1 border border-white/15 rounded-full"
                  width={200}
                  height={200}
                />
                <div className="loader flex items-center justify-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                  <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                  <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
                </div>
              </div>
            )}
          </div>
        )}

        <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />
        <p className="text-xs absolute bottom-2 text-gray-300">
          Sandy can make mistakes, for reference only.
        </p>
      </div>
    </div>
  );
}
