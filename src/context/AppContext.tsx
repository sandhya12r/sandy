"use client";
import { createContext, useContext, ReactNode , useState, useEffect} from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";

interface AppContextType {
  user: ReturnType<typeof useUser>["user"];
  chats: any[]; 
  setChats: (chats: any[]) => void; 
  selectedChat: any; 
  setSelectedChats: (selectedChat: any) => void; 
  fetchUsersChats: () => void;
  createNewChat: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const {getToken} = useAuth();

  const [chats,  setChats] = useState([]);
  const [selectedChat,  setSelectedChats] = useState([]);

  const createNewChat = async () => {
    try {
      if(!user) return null;
      const token = await getToken();
      await axios.post("/api/chat/create", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message)
  } else {
    toast.error('An unknown error occurred')
  }
}
  }
  const fetchUsersChats = async () => {
    try{
      const token = await getToken();
    const { data} =  await axios.get("/api/chat/get", {
        headers: {
          Authorization: `Bearer ${token}`
        } 
      })
      if(data.success){
        console.log(data.data);
        setChats(data.data);

        if(data.data.length === 0){
          await createNewChat();
          return fetchUsersChats();
        }
        else{
            data.data.sort((a:any,b:any)=> new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

            setSelectedChats(data.data[0]);
            console.log(data.data[0]);
        }
      }else{
        toast.error(data.message)
      }
    }catch(error: unknown){
    if (error instanceof Error) {
      toast.error(error.message)
    } else {
      toast.error('An unknown error occurred')
    }
    }
  }

  useEffect(() => {
    if(user){
      fetchUsersChats();
    }
  }, [user])
  const value: AppContextType = {
    user,
    chats,
    setChats,
    selectedChat,
    setSelectedChats,
    fetchUsersChats,
    createNewChat
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
