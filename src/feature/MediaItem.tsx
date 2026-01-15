import { useEffect, useState } from "react";
import { Media, Page } from "../types";
import PageTitle from "./PageTitle";
import PageDetailsButton from "./PageDetailsButton";
import { useAnimationContext } from "@/context/AnimationContextDef";
interface Props {
  page: Page;
  item: Media;
  index: number;
  videoRefs: React.RefObject<(HTMLVideoElement | null)[]>;
  triggerButton: boolean;
  visibleIndex: number;
}

const MediaItem = ({
  item,
  index,
  videoRefs,
  triggerButton,
  visibleIndex,
}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPauseIcon, setShowPauseIcon] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { setTriggerPulse } = useAnimationContext();

  useEffect(() => {
    if (triggerButton) {
      setTriggerPulse(triggerButton);
    }
  }, [triggerButton, setTriggerPulse]);

  const handleLoaded = () => {
    setIsLoading(false);
  };

  const handleVideoPlayPause = () => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
        setIsPaused(false);
      } else {
        video.pause();
        setIsPaused(true);
      }
      setShowPauseIcon(true);
      setTimeout(() => setShowPauseIcon(false), 2000);
    }
  };

  return (
    <div
      className="snap-start h-[100dvh] w-full flex items-center justify-center relative media-item bg-white"
      data-index={index}
      onClick={item.type === "video" ? handleVideoPlayPause : undefined}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white"></div>
      )}

      <PageTitle title={item.title} subTitle={item.subTitle} />
      <PageDetailsButton
        triggerButton={triggerButton}
        description={item.description}
        title={item.title}
        variante={item.variante}
      />
      <div className="relative w-full h-full flex items-center justify-center">
        {item.type === "image" ? (
          <img
            src={item.url}
            alt={`Media ${item.id}`}
            className="w-full h-full object-cover"
            style={{ aspectRatio: "9/16", maxWidth: "1080px" }}
            onLoad={handleLoaded}
            onError={handleLoaded}
            loading={index <= visibleIndex + 1 ? "eager" : "lazy"}
            draggable={false}
          />
        ) : (
          <>
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={item.url}
              className="w-full h-full object-cover"
              style={{ aspectRatio: "9/16", maxWidth: "1080px" }}
              autoPlay
              loop
              playsInline
              onLoadedData={handleLoaded}
              onError={handleLoaded}
            />
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-100 ${
                showPauseIcon ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-black/50 rounded-full p-4">
                <svg
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isPaused ? (
                    <path d="M8 5v14l11-7z" />
                  ) : (
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  )}
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MediaItem;
