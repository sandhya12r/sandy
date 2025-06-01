import { useAppContext } from '@/context/AppContext';
import { Ellipsis, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ChatLabelProps {
  id: number | string;
  name: string;
  openMenu: { id: number | string; open: boolean };
  setOpenMenu: React.Dispatch<React.SetStateAction<{ id: number | string; open: boolean }>>;
}

const ChatLabel: React.FC<ChatLabelProps> = ({ openMenu, setOpenMenu, id, name }) => {
  const { fetchUsersChats, chats, setSelectedChat } = useAppContext();

  const selectChat = (id: number | string) => {
    const chatData = chats.find((chat: any) => chat._id === id);
    setSelectedChat(chatData);
  };

  const renameChat = async (id: number | string) => {
    try {
      const newName = prompt('Enter new name');
      if (!newName) return;

      const { data } = await axios.post('/api/chat/rename', { id, name: newName });
      if (data.success) {
        fetchUsersChats();
        setOpenMenu({ id: 0, open: false });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteChat = async (id: number | string) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this chat?');
      if (!confirmDelete) return;

      const { data } = await axios.post("/api/chat/delete", { chatId: id });
      if (data.success) {
        fetchUsersChats();
        setOpenMenu({ id: 0, open: false });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => selectChat(id)}
      className="flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer"
    >
      <p className="truncate group-hover:max-w-5/6">{name}</p>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenu({ id, open: !openMenu.open });
        }}
        className="group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-gray/80 rounded-lg"
      >
        <span className={`w-4 ${openMenu.id === id && openMenu.open ? '' : 'hidden'} group-hover:block`}>
          <Ellipsis />
        </span>
        <div
          className={`absolute ${openMenu.id === id && openMenu.open ? 'block' : 'hidden'} -right-36 top-6 bg-gray-700 rounded-xl w-max p-2`}
        >
          <div
            onClick={() => renameChat(id)}
            className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-3 py-2"
          >
            <span className="w-4">
              <Pencil />
            </span>
            <p>Rename</p>
          </div>
          <div
            onClick={() => deleteChat(id)}
            className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-3 py-2"
          >
            <span className="w-4">
              <Trash2 />
            </span>
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLabel;
