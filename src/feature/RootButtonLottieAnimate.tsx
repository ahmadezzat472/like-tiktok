import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationDotCircle from "../../public/animation/animation_dot_circle.json";
import animationIconPlus from "../../public/animation/animation_icon_plus.json";
import { useModalContext } from "@/context/ModalContextDef";
import { useAnimationContext } from "@/context/AnimationContextDef";

const RootButtonLottieAnimate = () => {
  const { setIsModalOpen, isModalOpen } = useModalContext();
  const { triggerPulse, setTriggerPulse } = useAnimationContext();
  const [showIconPlus, setShowIconPlus] = useState(false);
  const dotCircleRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (triggerPulse) {
      // Reset to show dot circle animation first
      setShowIconPlus(false);
      if (dotCircleRef.current) {
        dotCircleRef.current.play();
      }

      const timer = setTimeout(() => {
        setTriggerPulse(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [triggerPulse, setTriggerPulse]);

  const handleOpenModel = () => {
    setTimeout(() => {
      setIsModalOpen(!isModalOpen);
    }, 1200); // Delay to ensure the modal opens after the animation
  };

  if (!triggerPulse) {
    return null;
  }

  return (
    <button
      onClick={handleOpenModel}
      className="page-details-button absolute bottom-[20px] right-[20px] rounded-[26px] w-[52px] h-[52px]  flex items-center justify-center z-50 transition-all"
    >
      {/* Dot Circle Animation */}
      <div className="relative w-[52px] h-[52px] ">
        <Lottie
          lottieRef={dotCircleRef}
          animationData={animationDotCircle}
          loop={false}
          autoplay={true}
          onComplete={() => {
            setShowIconPlus(true); // Show plus icon animation after dot circle completes
          }}
          className="absolute inset-0 scale-[1.7]"
        />
        {/* Icon Plus Animation, centered within the dot circle */}
        {showIconPlus && (
          <Lottie
            animationData={animationIconPlus}
            loop={false}
            autoplay={true}
            className="absolute inset-0 scale-[1.97] m-auto"
          />
        )}
      </div>
    </button>
  );
};

export default RootButtonLottieAnimate;
