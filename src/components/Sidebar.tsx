import {
  CircleUser,
  MenuIcon,
  MessageCircle,
  MessageCircleMore,
  PanelLeftOpen,
  PanelRightOpen,
  ShieldUser,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { useClerk, UserButton } from '@clerk/nextjs';
import { useAppContext } from '@/context/AppContext';
import ChatLabel from './ChatLabel';

interface SidebarProps {
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ expand, setExpand }) => {
  const { openSignIn } = useClerk();
  const { user, chats, createNewChat } = useAppContext();
  const [openMenu, setOpenMenu] = useState({ id: 0, open: false });

  return (
    <div
      className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${
        expand ? 'p-4 w-60' : 'md:w-20 w-0 max-md:overflow-hidden'
      }`}
    >
      <div>
        {/* Logo & Toggle */}
        <div
          className={`flex ${
            expand ? 'flex-row gap-18' : 'flex-col items-center gap-8'
          }`}
        >
          <Image
            className={expand ? 'w-24' : 'w-10'}
            src={expand ? '/sandy.png' : '/logo.png'}
            alt="logo"
            width={200}
            height={200}
          />
          <div
            onClick={() => setExpand(!expand)}
            className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 w-8 h-8 rounded-lg cursor-pointer"
            role="button"
            aria-label="Toggle Sidebar"
          >
            <span className="md:hidden">
              <MenuIcon />
            </span>
            <span className="hidden md:block w-7">
              {expand ? <PanelRightOpen /> : <PanelLeftOpen />}
            </span>
            <div
              className={`absolute w-max ${
                expand
                  ? 'left-1/2 -translate-x-1/2 top-12'
                  : '-top-12 left-0'
              } opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}
            >
              {expand ? 'Close Sidebar' : 'Open Sidebar'}
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${
                  expand
                    ? 'left-1/2 -top-1.5 -translate-x-1/2'
                    : 'left-4 -bottom-1.5'
                }`}
              />
            </div>
          </div>
        </div>

        {/* New Chat */}
        <button
          onClick={createNewChat}
          className={`mt-8 flex items-center justify-center cursor-pointer ${
            expand
              ? 'bg-[#E1BC6D] text-[#212327] hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max'
              : 'group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg'
          }`}
        >
          <span className={`${expand ? 'w-5' : 'w-7'}`}>
            {expand ? <MessageCircleMore /> : <MessageCircle />}
          </span>
          <div className="absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-1 rounded-lg shadow-lg pointer-events-none">
            New Chat
            <div className="w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5" />
          </div>
          {expand && (
            <p className="text-[#212327] text-base font-semibold">New Chat</p>
          )}
        </button>

        {/* Recent Chats */}
        <div
          className={`mt-8 text-white/40 text-sm ${expand ? 'block' : 'hidden'}`}
        >
          <p className="my-1">Recents</p>
          {chats.map((chat: any) => (
            <ChatLabel
              key={chat._id}
              name={chat.name}
              id={chat._id}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />
          ))}
        </div>
      </div>

      {/* Footer/Profile Section */}
      <div>
        {/* QR/Profile Info */}
        <div
          className={`flex items-center cursor-pointer group relative ${
            expand
              ? 'gap-3 text-white/80 text-sm p-2.5 border border-[#E1BC6D] rounded-lg hover:bg-white/10'
              : 'h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg'
          }`}
        >
          <span className={`${expand ? 'w-5' : 'w-6.5 mx-auto'}`}>
            <ShieldUser />
          </span>
          <div
            className={`absolute -top-52 pb-8 ${
              !expand ? 'right-[120px]' : ''
            } opacity-0 group-hover:opacity-100 hidden group-hover:block transition`}
          >
            <div className="relative w-max bg-black text-white text-sm p-3 rounded-lg shadow-lg">
              <Image
                className="w-38"
                src="/profile-qr.png"
                alt="Profile QR"
                width={400}
                height={400}
              />
              <p>Scan to check Profile</p>
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${
                  expand ? 'right-1/2' : 'left-4'
                } -bottom-1.5`}
              />
            </div>
          </div>
          {expand && <span>View Sandy's Profile</span>}
        </div>

        {/* Clerk User/Profile Button */}
        <div
          onClick={() => (!user ? openSignIn() : null)}
          className={`flex items-center ${
            expand ? 'hover:bg-white/10 rounded-lg' : 'justify-center w-full'
          } gap-3 text-white/60 text-sm p-2 mt-2 hover:cursor-pointer`}
        >
          {user ? (
            <UserButton />
          ) : (
            <span>
              <CircleUser className="w-7" />
            </span>
          )}
          {expand && <span>My Profile</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
