"use client";
import { useAppContext } from '@/context/AppContext';
import axios from 'axios';
import { ArrowUp, Globe, Paperclip, Sparkle } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface PromptBoxProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const PromptBox: React.FC<PromptBoxProps> = ({ isLoading, setIsLoading }) => {
  const [prompt, setPrompt] = useState('');
  const {
    user,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
  } = useAppContext();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendPrompt(e);
    }
  };

  const sendPrompt = async (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const promptCopy = prompt;
    try {
      e.preventDefault();
      if (!user) return toast.error('Login to send Message');
      if (isLoading) return toast.error('Please Wait');

      setIsLoading(true);
      setPrompt('');

      const userPrompt = {
        role: 'user',
        content: prompt,
        timestamp: Date.now(),
      };

      setChats((prevChats: any[]) =>
        prevChats.map((chat: any) =>
          chat._id === selectedChat._id
            ? { ...chat, messages: [...chat.messages, userPrompt] }
            : chat
        )
      );

      //saving user prompt in selected chat
      setSelectedChat((prev: any) => ({
        ...prev,
        messages: [...prev.messages, userPrompt],
      }));

      const { data } = await axios.post('/api/chat/ai', {
        chatId: selectedChat._id,
        prompt: promptCopy,
      });

      if (data.success) {
        setChats((prevChats: any[]) =>
          prevChats.map((chat: any) =>
            chat._id === selectedChat._id
              ? { ...chat, messages: [...chat.messages, data.data] }
              : chat
          )
        );

        const message = data.data.content;
        const messageTokens = message.split(" ");

        let assistantMessage = {
          role: 'assistant',
          content: '',
          timestamp: Date.now(),
        };

        setSelectedChat((prev: any) => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
        }));

        for (let i = 0; i < messageTokens.length; i++) {
          setTimeout(() => {
            assistantMessage.content = messageTokens.slice(0, i + 1).join(" ");
            setSelectedChat((prev: any) => {
              const updatedMessages = [
                ...prev.messages.slice(0, -1),
                assistantMessage,
              ];
              return {
                ...prev,
                messages: updatedMessages,
              };
            });
          }, i*100);
        }
      
       } else {
        toast.error(data.message);
        setPrompt(promptCopy);
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
      setPrompt(promptCopy);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={sendPrompt}
      className={`w-full ${
        selectedChat.messages.length>0 ? 'max-w-3xl' : 'max-w-2xl'
      } bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}
    >
      <textarea
        onKeyDown={handleKeyDown}
        className='outline-none w-full resize-none overflow-hidden break-words bg-transparent'
        rows={2}
        placeholder='Message Sandy'
        required
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />
      <div className='flex items-center justify-between text-sm'>
        <div className='flex items-center gap-2'>
          <p className='flex items-center gap-2 text-sm border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
            <span className='w-5'>
              <Sparkle className='w-5' />
            </span>
            Sandy AI
          </p>
          <p className='flex items-center gap-2 text-sm border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
            <span className='w-5'>
              <Globe className='w-5' />
            </span>
            Search
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <span className='w-4 cursor-pointer'>
            <Paperclip />
          </span>
          <button
            type='submit'
            className={`${
              prompt ? 'bg-[#E1BC6D]' : 'bg-[#71717a]'
            } rounded-full p-1 cursor-pointer`}
          >
            <span className='w-3.5 aspect-square'>
              <ArrowUp />
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default PromptBox;
