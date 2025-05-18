import { ArrowUp, Globe, Paperclip, Sparkle  } from 'lucide-react'
import React, { useState } from 'react'

interface PromptBoxprops {
    isLoading: Boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}
const PromptBox: React.FC<PromptBoxprops> = ({ isLoading, setIsLoading }) => {
    const [prompt, setPrompt] = useState('');
    return (
        <form className={`w-full ${false ? "max-w-3xl" : "max-w-2xl"} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
            <textarea
                className='outline-none w-full resize-none overf    low-hidden break-words bg-transparent'
                rows={2}
                placeholder='Message Sandy' required
                onChange={(e) => setPrompt(e.target.value)} value={prompt}
            />
            <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-2'>
                    <p className='flex items-center gap-2 text-sm border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                        <span className='w-5'><Sparkle className='w-5' /></span>
                        Sandy AI
                    </p>
                    <p className='flex items-center gap-2 text-sm border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                        <span className='w-5'><Globe className='w-5' /></span>
                        Search
                    </p>
                </div>
                <div className='flex items-center gap-3'>
                    <span className='w-4 cursor-pointer'><Paperclip /></span>
                    <button className={`${prompt ? "bg-[#E1BC6D]" : "bg-[#71717a]"} rounded-full p-1 cursor-pointer`}>
                        <span className='w-3.5 aspect-square'><ArrowUp /></span>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PromptBox
