import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import PageNavigation from "../../feature/PageNavigation";
import LanguageDialog from "../../feature/LanguageDialog";
import { useEffect } from "react";
import Logo from "../../feature/Logo";
import RootButtonLottieAnimate from "@/feature/RootButtonLottieAnimate";
import RootButton from "@/feature/RootButton";
import { useExcelPages } from "@/hooks/useExcelPages";
import { useLanguageContext } from "@/context/LanguageContextDef";

const MainLayout = () => {
  const { language, isLangDialogOpen } = useLanguageContext();
  const { pages, isLoading, error } = useExcelPages();
  const { pageId } = useParams<{ pageId: string }>();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isZRoute = location.pathname.startsWith("/z");
    const isDRoute = location.pathname.startsWith("/d");
    let targetLetter = "z";

    if (isZRoute) {
      targetLetter = "z";
    } else if (isDRoute) {
      targetLetter = "d";
    }

    navigate(`${targetLetter}/page/${1}`, {
      replace: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    if (isLoading || !pages.length || !pageId) return;

    const preloadImages = () => {
      const currentPageIndex = pages.findIndex((page) => page.id === pageId);
      if (currentPageIndex === -1) return;
      const pageToPreload = pages[currentPageIndex];
      pageToPreload.media.forEach((item) => {
        if (item.type === "image") {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = item.url;
          link.type = "image/webp";
          document.head.appendChild(link);
        }
      });
    };

    preloadImages();

    return () => {
      const preloadLinks = document.querySelectorAll(
        'link[rel="preload"][as="image"]'
      );
      preloadLinks.forEach((link) => link.remove());
    };
  }, [pages, isLoading, pageId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white"></div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="font-bold">Error:</span> {error}
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen bg-white">
      <div className="relative w-full max-w-[381px] h-[100dvh] bg-white">
        <Logo />
        <PageNavigation pages={pages} />
        <LanguageDialog />
        {!isLangDialogOpen && <RootButtonLottieAnimate />}
        {!isLangDialogOpen && <RootButton />}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
