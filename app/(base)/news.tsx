import { View, StyleSheet, FlatList } from "react-native";
import React from "react";
import { ActivityIndicator, useTheme, Text } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import NewsCard from "@/components/NewsCard";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const { data, error, isPending, isFetching, isSuccess } = useQuery({
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
    <SafeAreaView style={homeScreenStyle.container}>
      {(isPending || isFetching) && (
        <ActivityIndicator size="large" color="#fff" />
      )}
      {isSuccess && (
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
      {error ? (
        <Text style={{ color: "red", fontWeight: 800 }} variant="bodyLarge">
          {error?.message}
        </Text>
      ) : null}
    </SafeAreaView>
  );
};

export default NewsScreen;
