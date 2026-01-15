import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Page, Media, Variant, ExcelRow } from "../types";
import { useLocation } from "react-router";
import { useLanguageContext } from "@/context/LanguageContextDef";

export const useExcelPages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const { language } = useLanguageContext();

  useEffect(() => {
    const path = location.pathname.startsWith("/z") ? "zh" : "dd";
    const cacheKey = `menue_${path}_${language}`;
    const cacheTimestampKey = `${cacheKey}_timestamp`;

    // Check if cached data exists and is still valid (within 12 hours)
    const cachedPages = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(cacheTimestampKey);
    const VALID_HOURS_IN_MS = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
    const now = Date.now();

    if (cachedPages && cachedTimestamp) {
      const cacheAge = now - parseInt(cachedTimestamp, 10);
      if (cacheAge < VALID_HOURS_IN_MS) {
        try {
          setPages(JSON.parse(cachedPages));
          setIsLoading(false);
          return;
        } catch (err) {
          console.error("Failed to parse cached pages:", err);
          // Clear invalid cache
          localStorage.removeItem(cacheKey);
          localStorage.removeItem(cacheTimestampKey);
        }
      } else {
        // Cache is older than 12 hours, clear it
        localStorage.removeItem(cacheKey);
        localStorage.removeItem(cacheTimestampKey);
      }
    }

    const fetchPages = async () => {
      try {
        setIsLoading(true);
        const route = location.pathname.startsWith("/z") ? "zh" : "dd";
        const filePath = `/data/menue_${route}_${language}.xlsx`;
        const response = await fetch(filePath, { cache: "force-cache" });
        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}, file: ${filePath}`
          );
        }
        const arrayBuffer = await response.arrayBuffer();

        // Parse the XLSX file
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Extract data rows
        const rows = jsonData.slice(1) as ExcelRow[];

        // Map rows to Page objects
        const pageMap = new Map<string, Page>();

        rows.forEach((row) => {
          if (typeof row[0] !== "number") return;

          const normalizeDash = (value: unknown): string =>
            value === "–" || value === "-" ? "" : value?.toString() || "";

          const pageId = row[0].toString();
          const pageName = normalizeDash(row[1]);

          if (!pageMap.has(pageId)) {
            pageMap.set(pageId, {
              id: pageId,
              title: pageName,
              media: [],
            });
          }

          const page = pageMap.get(pageId)!;

          const variante: Variant[] = [
            {
              id: "1",
              title: normalizeDash(row[7]),
              subTitle: normalizeDash(row[8]),
            },
            {
              id: "2",
              title: normalizeDash(row[9]),
              subTitle: normalizeDash(row[10]),
            },
            {
              id: "3",
              title: normalizeDash(row[11]),
              subTitle: normalizeDash(row[12]),
            },
            {
              id: "4",
              title: normalizeDash(row[13]),
              subTitle: normalizeDash(row[14]),
              svg: normalizeDash(row[14])
                ? "/icons/icon_glutenfrei.svg"
                : undefined,
            },
            {
              id: "5",
              title: normalizeDash(row[15]),
              subTitle: normalizeDash(row[16]),
              svg: normalizeDash(row[16]) ? "/icons/icon_vegan.svg" : undefined,
            },
            {
              id: "6",
              title: normalizeDash(row[17]),
              subTitle: normalizeDash(row[18]),
              svg: normalizeDash(row[18])
                ? "/icons/icon_vollkorn.svg"
                : undefined,
            },
          ].filter((v) => v.title && v.subTitle);

          const mediaItem: Media = {
            id: row[2].toString(),
            type:
              row[3].toString().startsWith("image") ||
              row[3].toString().startsWith("placeholder")
                ? "image"
                : "video",
            url: row[3].toString().startsWith("image")
              ? `/bilder_programmierer_geliefert/${row[3]}_1080x1920.webp`
              : row[3].toString().startsWith("placeholder")
              ? `/bilder_programmierer_geliefert/${row[3]}_1080x1920.svg`
              : `/bilder_programmierer_geliefert/${row[3]}_1080x1920.mp4`,
            title: normalizeDash(row[4]),
            subTitle: normalizeDash(row[5]),
            description: normalizeDash(row[6]),
            variante,
          };

          page.media.push(mediaItem);
        });

        const parsedPages: Page[] = Array.from(pageMap.values()).sort(
          (a, b) => Number(a.id) - Number(b.id)
        );

        setPages(parsedPages);
        localStorage.setItem(cacheKey, JSON.stringify(parsedPages));
        localStorage.setItem(cacheTimestampKey, now.toString());
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load or parse XLSX file");
        setIsLoading(false);
      }
    };

    fetchPages();
  }, [location.pathname, language]);

  return { pages, isLoading, error };
};
