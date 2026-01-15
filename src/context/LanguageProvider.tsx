import { ReactNode, useState } from "react";
import { LanguageContext } from "./LanguageContextDef";

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [isLangDialogOpen, setIsLangDialogOpen] = useState(true);
  const [language, setLanguage] = useState<"en" | "de">("de");

  return (
    <LanguageContext.Provider
      value={{ isLangDialogOpen, setIsLangDialogOpen, language, setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
