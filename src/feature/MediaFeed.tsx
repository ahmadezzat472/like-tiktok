import { memo, useEffect, useRef, useState } from "react";
import { Page } from "../types";
import { useLocation } from "react-router";
import MediaItem from "./MediaItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { useModalContext } from "@/context/ModalContextDef";

interface Props {
  page: Page;
}

const MediaFeed = ({ page }: Props) => {
  const { media } = page;
  const location = useLocation();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const { setIsModalOpen } = useModalContext();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  // Reset carousel position when location changes
  useEffect(() => {
    if (api) {
      api.scrollTo(0);
      setVisibleIndex(null); // Reset visible index
    }
  }, [location.pathname, api]);

  // Handle mouse wheel scrolling (one slide at a time)
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!api || isScrolling.current) return;
      event.preventDefault();
      isScrolling.current = true;

      const delta = event.deltaY;
      if (delta > 0) {
        api.scrollNext();
      } else if (delta < 0) {
        api.scrollPrev();
      }

      // Reset scrolling flag after a short delay
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("wheel", handleWheel);
      }
    };
  }, [api]);

  // Intersection Observer for media items
 useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setIsModalOpen(false);
            setVisibleIndex(index);
            const video = videoRefs.current[index];
            if (video) {
              video
                .play()
                .catch((err) => console.error("Video play error:", err));
            }
          } else {
            const video = videoRefs.current[index];
            if (video) {
              video.pause();
            }
            // Reset visible index only if this item was the visible one
            if (visibleIndex === index) {
              setVisibleIndex(null);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const items = document.querySelectorAll(".media-item");
    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, [media, setIsModalOpen, visibleIndex]);

  return (
    <Carousel
      setApi={setApi}
      className="w-full !h-[100dvh]"
      orientation="vertical"
      opts={{
        align: "start",
        loop: true,
      }}
      ref={carouselRef}
    >
      <CarouselContent className="h-[100dvh] !mt-0">
        {media.map((item, index) => (
          <CarouselItem key={index} className="h-[100dvh] !p-0">
            <MediaItem
              visibleIndex={visibleIndex ? visibleIndex : 0}
              item={item}
              index={index}
              videoRefs={videoRefs}
              page={page}
              triggerButton={visibleIndex === index}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default memo(MediaFeed);
