"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";

// Correctly typed context interface
interface AppContextType {
  user: ReturnType<typeof useUser>["user"];
  chats: any[];
  setChats: Dispatch<SetStateAction<any[]>>;
  selectedChat: any;
  setSelectedChat: Dispatch<SetStateAction<any>>;
  fetchUsersChats: () => void;
  createNewChat: () => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook for using context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

// Provider component
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);

  const createNewChat = async () => {
    try {
      if (!user) return;
      const token = await getToken();
      await axios.post(
        "/api/chat/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const fetchUsersChats = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/chat/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setChats(data.data);

        if (data.data.length === 0) {
          await createNewChat();
          return fetchUsersChats();
        } else {
          data.data.sort(
            (a: any, b: any) =>
              new Date(b.updatedAt).getTime() -
              new Date(a.updatedAt).getTime()
          );
          setSelectedChat(data.data[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsersChats();
    }
  }, [user]);

  const value: AppContextType = {
    user,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    fetchUsersChats,
    createNewChat,
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};
