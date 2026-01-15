import { createContext, useContext } from "react";

export interface ModalContextType {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
