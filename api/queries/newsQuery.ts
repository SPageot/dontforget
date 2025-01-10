import { NewsType } from "@/types/types";
import { BASE_API_URL } from "@/util/constants";

export const getNews = async (): Promise<NewsType[] | undefined> => {
  const response = await fetch(`${BASE_API_URL}/news`);
  const { data: newsData } = await response.json();
  return newsData.articles.filter(
    (article: NewsType) => article.title !== "[Removed]"
  );
};
