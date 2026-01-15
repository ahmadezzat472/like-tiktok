import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import { useAnimationContext } from "@/context/AnimationContextDef";
import { useModalContext } from "@/context/ModalContextDef";

const RootButton = () => {
  const { setIsModalOpen, isModalOpen } = useModalContext();
  const { triggerPulse, setTriggerPulse } = useAnimationContext();

  useEffect(() => {
    if (triggerPulse) {
      const timer = setTimeout(() => {
        setTriggerPulse(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [setTriggerPulse, triggerPulse]);

  if (!triggerPulse) {
    return null;
  }

  return (
    <button
      onClick={() => setIsModalOpen(!isModalOpen)}
      className={`page-details-button absolute bottom-[20px] right-[20px] rounded-[26px] flex flex-col items-end justify-between z-40 bg-white transition-all  ${
        triggerPulse ? "" : ""
      }`}
    >
      {/* White dot/circle that expands into the button */}
      <div
        className={`rounded-[26px] bg-white flex px-2 items-center justify-end absolute bottom-0 right-0 h-[52px] w-[98px] ${
          triggerPulse ? "animate-circle" : ""
        }`}
      >
        {/* Text */}
        <span
          className={`font-bold text-black transition-all duration-300  ${
            triggerPulse ? "animate-text" : ""
          }`}
        >
          Info
        </span>

        {/* Black circle with plus icon */}
        <div
          className={`rounded-full min-w-[36px] min-h-[36px] w-[36px] h-[36px] flex items-center justify-center bg-black ml-2 ${
            triggerPulse ? "animate-icon" : "opacity-100"
          }`}
        >
          <FaPlus
            color="#fff"
            className={`w-4 h-4 transition-all duration-300 `}
          />
        </div>
      </div>
    </button>
  );
};

export default RootButton;
