import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import NewsCard from "@/components/NewsCard";

type SourceType = {
  id: number | null;
  name: string;
};

type NewsType = {
  source: SourceType;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

const NewsScreen = () => {
  const theme = useTheme();
  const { data, error, isPending } = useQuery({
    queryKey: ["news"],
    queryFn: async (): Promise<NewsType[] | undefined> => {
      const response = await fetch("http://127.0.0.1:8000/news");
      const { data: newsData } = await response.json();
      return newsData.articles.filter(
        (article: NewsType) => article.title !== "[Removed]"
      );
    },
  });

  const homeScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
      gap: 30,
    },
  });
  return (
    <View style={homeScreenStyle.container}>
      {isPending ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          contentContainerStyle={{ gap: 10 }}
          data={data}
          renderItem={({ item }) => (
            <NewsCard
              author={item.author}
              title={item.title}
              url={item.url}
              urlToImage={item.urlToImage}
              description={item.description}
            />
          )}
        />
      )}
    </View>
  );
};

export default NewsScreen;
