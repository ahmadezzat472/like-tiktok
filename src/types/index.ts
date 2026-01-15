export interface Variant {
  id: string;
  title: string;
  subTitle: string;
  svg?: string;
}

export interface Media {
  id: string;
  type: "image" | "video";
  url: string;
  title: string;
  subTitle: string;
  description: string;
  variante: Variant[];
}

export interface Page {
  id: string;
  title: string;
  media: Media[];
}

export interface ExcelRow {
  0: number; // Page ID
  1: string; // Page name
  2: number; // Image position
  3: string; // Image/video identifier
  4: string; // Title
  5: string; // Subtitle
  6: string; // Ingredients/description
  7?: string; // Variant 1 title
  8?: string; // Variant 1 subtitle
  9?: string; // Variant 2 title
  10?: string; // Variant 2 subtitle
  11?: string; // Variant 3 title
  12?: string; // Variant 3 subtitle
  13?: string; // Variant 4 title (glutenfrei)
  14?: string; // Variant 4 subtitle
  15?: string; // Variant 5 title (vegan)
  16?: string; // Variant 5 subtitle
  17?: string; // Variant 6 title (vollkorn)
  18?: string; // Variant 6 subtitle
}
