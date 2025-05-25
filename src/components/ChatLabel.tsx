import { Ellipsis, Pencil, Trash2 } from 'lucide-react'
import React from 'react'
interface ChatLabelProps {
    openMenu: { id: number; open: boolean };
    setOpenMenu: React.Dispatch<React.SetStateAction<{ id: number; open: boolean }>>
};
const ChatLabel: React.FC<ChatLabelProps> = ({ openMenu, setOpenMenu }) => {
  return (
    <div className={`flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer`}>
      <p className='group-hover:max-w-5/6 truncate'>Chat Name Here</p>
      <div className='group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-gray/80 rounded-lg'>
        <span className={`w-4 ${openMenu.open? '': 'hidden'} group-hover:block`}><Ellipsis/></span>
        <div className={`absolute ${openMenu.open? 'block': 'hidden'} -right-36 top-6 bg-gray-700 rounded-xl w-max p-2`}>
            <div className='flex items-center gap-3 hover:bg-white/10 rounded-lg px-3 py-2'> 
                <span className='w-4'><Pencil/></span>
                <p>Rename</p>
            </div>
            <div className='flex items-center gap-3 hover:bg-white/10 rounded-lg px-3 py-2'> 
                <span className='w-4'><Trash2/></span>
                <p>Delete</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ChatLabel
