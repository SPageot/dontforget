import { FlatList } from "react-native";
import React from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import NewsCard from "@/components/NewsCard";
import { getNews } from "@/api/queries/newsQuery";
import ScreenContainer from "@/components/ScreenContainer";

const NewsScreen = () => {
  const { data, error, isPending, isFetching, isSuccess } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  return (
    <ScreenContainer>
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
      {error && (
        <Text style={{ color: "red", fontWeight: 800 }} variant="bodyLarge">
          {error?.message}
        </Text>
      )}
    </ScreenContainer>
  );
};

export default NewsScreen;
