import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

export type Category = {
  id: string;
  name: string;
};

export type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

export type News = {
  id: string;
  title: string;
  content?: string;
  category?: Category;
  eyecatch?: MicroCMSImage;
  publishedAt: string;
};

export const getNewsList = async (limit = 5) => {
  return client.getList<News>({
    endpoint: "news",
    queries: { limit, orders: "-publishedAt" },
  });
};

export const getNewsDetail = async (id: string) => {
  return client.getListDetail<News>({
    endpoint: "news",
    contentId: id,
  });
};

export const getAllNews = async () => {
  return client.getList<News>({
    endpoint: "news",
    queries: { limit: 100, orders: "-publishedAt" },
  });
};

// ─── top API ───────────────────────────────────────────────────────────────

export type TopFeature = {
  fieldId: string;
  label: string;
  text: string;
};

export type TopRoom = {
  fieldId: string;
  name: string;
  description: string;
  image?: MicroCMSImage;
};

export type TopRoomsSection = {
  heading: string;
  description: string;
  image?: MicroCMSImage;
  room: TopRoom[];
};

export type TopFaq = {
  fieldId: string;
  question: string;
  answer: string;
};

export type TopSightseeing = {
  fieldId: string;
  name: string;
  description: string;
  image?: MicroCMSImage;
  access?: string;
};

type TopSection = {
  heading: string;
  description: string;
  image?: MicroCMSImage;
  features?: TopFeature[];
};

export type TopContent = {
  firstview: {
    catchcopy: string;
    images: MicroCMSImage[];
  };
  hotspring: TopSection;
  food: TopSection;
  rooms: TopRoomsSection;
  history: { heading: string; history: string; image?: { url: string } };
  access: { heading: string; access: string; map_url?: string };
  contact?: { heading: string; description: string } | null;
  faq: TopFaq[];
  sightseeing: TopSightseeing[];
};

export const getTop = async () => {
  return client.get<TopContent>({
    endpoint: "top",
  });
};

export const getAllNewsIds = async () => {
  const res = await client.getList<News>({
    endpoint: "news",
    queries: { limit: 100, fields: "id" },
  });
  return res.contents.map((item) => item.id);
};
