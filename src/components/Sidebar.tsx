import { MenuIcon, MessageCircle, MessageCircleMore, PanelLeftOpen, PanelRightOpen } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
interface SidebarProps {
    expand: boolean;
    setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ expand, setExpand }) => {
    return (
        <div className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${expand ? 'p-4 w-60' : 'md:w-20 w-0 max-md:overflow-hidden'}`}>
            <div>
                <div className={`flex ${expand ? 'flex-row gap-18' : 'flex-col items-center gap-8'}`}>
                    <Image className={expand ? 'w-24' : 'w-10'} src={expand ? "/sandy.png" : "/logo.png"} alt="logo" width={200} height={200} />
                    <div onClick={() => expand ? setExpand(false) : setExpand(true)} className='group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 w-8 h-8 aspect-square rounded-lg cursor-pointer'>
                        <span className='md:hidden'><MenuIcon /></span>
                        <span className='hidden md:block w-7'>{expand ? <PanelRightOpen /> : <PanelLeftOpen />}</span>
                        <div className={`absolute w-max ${expand ? 'left-1/2 -translate-x-1/2 top-12' : '-top-12 left-0'} opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}>
                            {expand ? 'Close Sidebar' : 'Open Sidebar'}
                            <div className={`w-3 h-3 absolute bg-black rotate-45 ${expand ? 'left-1/2 -top-1.5 -translate-x-1/2' : 'left-4 -bottom-1.5'}`}></div>
                        </div>
                    </div>
                </div>

                <button>
                    <div className={`${expand ? 'w-6' : 'w-7'}`}>
                        {expand ? <MessageCircleMore /> : <MessageCircle />}
                    </div>
                    <div className='absolute w-max -top-12 -right-12 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg'>
                        New Chat
                        <div className='w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5'></div>
                    </div>
                    {expand && <p className='text-white text font-medium'>New Chat</p>}
                </button>
            </div>
        </div>
    )
}
export default Sidebar;