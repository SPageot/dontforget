import React from "react";
import { Linking } from "react-native";
import { Card, Text } from "react-native-paper";

const NewsCard = ({
  author,
  title,
  description,
  url,
  urlToImage,
}: {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}) => {
  return (
    <Card
      onPress={() => {
        Linking.openURL(url).catch((err) =>
          console.error("Failed to open URL:", err)
        );
      }}
    >
      <Card.Content>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="bodySmall">By {author}</Text>
        <Text variant="bodyMedium">{description}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: urlToImage }} />
    </Card>
  );
};

export default NewsCard;
