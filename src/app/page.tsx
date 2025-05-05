'use client';
import { MenuIcon, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand} />
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <span><MenuIcon onClick={() => expand ? setExpand(false) : setExpand(true)} /></span>
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
          ) :
            (
              <div></div>
            )}

          {/* prompt box */}
          <p className="text-xs absolute bottom-2 text-gray-300">Sandy can make mistakes, for reference only.</p>
        </div>
      </div>
    </div>
  );
}
