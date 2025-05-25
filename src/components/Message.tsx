import { Copy, Heart, Pencil, RotateCcw, ThumbsDown } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
interface MessageProps {
 role: string;
 content: string;
}
const Message: React.FC<MessageProps> = ({role, content}) => {
  return (
    <div className='flex flex-col items-center w-full max-w-3xl text-sm'>
        <div className={`flex flex-col w-full mb-8 ${role=== 'user' && 'items-end'}`}>
          <div className={`group relative flex max-w-2xl py-3 rounded-xl ${role=== 'user' ? 'bg-[#414158] px-5': 'gap-3'}`}>
            <div className={`opacity-0 group-hover:opacity-100 absolute ${role === 'user' ? '-left-16 top-2.5':'left-9 -bottom-6'} transition-all`}>
              <div className='flex items-center gap-2 opacity-70'>
                {
                  role === 'user' ? (
                    <>
                    <Copy className='w-4 cursor-pointer'/>
                    <Pencil className='w-4 cursor-pointer'/>
                    </>
                  ) : (
                    <>
                    <Copy className='w-4.5 cursor-pointer'/>
                    <RotateCcw className='w-4 cursor-pointer'/>
                    <Heart className='w-4 cursor-pointer'/>
                    <ThumbsDown className='w-4 cursor-pointer'/>
                    </>
                  )
                }
              </div>
            </div>
            {
              role === 'user' ? (
                <span className='text-white/90'>{content}</span>
              ):(
<>
                <Image src="/fav.png" alt="logo" className='h-9 w-9 p-1 border border-white/15 rounded-full' width={200} height={200} />
<div className='space-y-4 w-full overflow-scroll'>
  {content}
</div>
</>              )
            }
          </div>
        </div>
    </div>
  )
}

export default Message
