"use client";
import { createContext, useContext, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";

interface AppContextType {
  user: ReturnType<typeof useUser>["user"];
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
  const value: AppContextType = {
    user,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
