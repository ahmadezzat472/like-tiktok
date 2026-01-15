import { useParams } from "react-router";
import MediaFeed from "../feature/MediaFeed";
import { useExcelPages } from "@/hooks/useExcelPages";

const MainPage = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const { pages } = useExcelPages();
  const selectedPage = pages.find((page) => page.id === pageId) || pages[0];

  if (!selectedPage) return null;

  return <MediaFeed page={selectedPage} />;
};

export default MainPage;
