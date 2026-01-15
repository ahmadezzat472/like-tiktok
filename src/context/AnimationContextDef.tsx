import { createContext, useContext } from "react";

export interface AnimationContextType {
  triggerPulse: boolean;
  setTriggerPulse: (value: boolean) => void;
  isAnimationComplete: boolean;
  setIsAnimationComplete: (value: boolean) => void;
}

export const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const useAnimationContext = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error(
      "useAnimationContext must be used within an AnimationProvider"
    );
  }
  return context;
};
