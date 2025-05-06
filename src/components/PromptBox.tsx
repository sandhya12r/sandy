import { Pin, Search, Sparkle } from 'lucide-react'
import React, { useState } from 'react'

const PromptBox = () => {
    const [prompt, setPrompt] = useState('');
    return (
        <form className={`w-full ${false ? "max-w-3xl" : "max-w-2xl"} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
            <textarea
                className='outline-none w-full resize-none overflow-hidden break-words bg-transparent'
                rows={2}
                placeholder='Message Sandy' required
                onChange={(e)=> setPrompt(e.target.value)}
            />
            <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-2'>
                    <p className=' flex items-center gap-2 text-sm border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                        <span className='h-5'><Sparkle /></span>
                        Sandy AI
                    </p>
                    <p className=' flex items-center gap-2 text-sm border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                        <span className='h-5'><Search /></span>
                        Search
                    </p>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='w-4 cursor-pointer'><Pin /></span>
                    <button>
                        <span className='w-4 cursor-pointer'><Pin /></span>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PromptBox
