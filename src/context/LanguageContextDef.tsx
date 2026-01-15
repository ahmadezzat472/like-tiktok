import { createContext, useContext } from "react";

export interface LanguageContextType {
  isLangDialogOpen: boolean;
  setIsLangDialogOpen: (value: boolean) => void;
  language: "en" | "de";
  setLanguage: (value: "en" | "de") => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }
  return context;
};
