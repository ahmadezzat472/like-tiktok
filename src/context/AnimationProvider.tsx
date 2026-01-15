import { ReactNode, useState } from "react";
import { AnimationContext } from "./AnimationContextDef";

const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [triggerPulse, setTriggerPulse] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  return (
    <AnimationContext.Provider
      value={{
        triggerPulse,
        setTriggerPulse,
        isAnimationComplete,
        setIsAnimationComplete,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationProvider;
