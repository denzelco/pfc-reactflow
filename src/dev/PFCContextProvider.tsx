import React, { createContext, useContext, useState } from "react";

interface PFCContextType {
    selectedRecipe: string;
    setSelectedRecipe: (recipe: string) => void;
    collapsedLeftPane: boolean;
    setCollapsedLeftPane: (collapsed: boolean) => void;
    collapsedRightPane: boolean;
    setCollapsedRightPane: (collapsed: boolean) => void;
    collapsedBottomPane: boolean;
    setCollapsedBottomPane: (collapsed: boolean) => void;
}

const PFCContext = createContext<PFCContextType | undefined>(undefined);

interface PFCContextProviderProps {
    children: React.ReactNode;
}

export const PFCContextProvider: React.FC<PFCContextProviderProps> = ({ children }) => {
    const [selectedRecipe, setSelectedRecipe] = useState<string>("VG_PRC");
    const [collapsedLeftPane, setCollapsedLeftPane] = useState<boolean>(false);
    const [collapsedRightPane, setCollapsedRightPane] = useState<boolean>(false);
    const [collapsedBottomPane, setCollapsedBottomPane] = useState<boolean>(false);

  return (
    <PFCContext.Provider value={{ selectedRecipe, setSelectedRecipe, collapsedLeftPane, setCollapsedLeftPane, collapsedRightPane, setCollapsedRightPane, collapsedBottomPane, setCollapsedBottomPane }}>
      {children}
    </PFCContext.Provider>
  );
};

export const usePFCContext = () => {
  const context = useContext(PFCContext);
  if (context === undefined) {
    throw new Error("usePFCContext must be used within a PFCContextProvider");
  }
  return context;
};