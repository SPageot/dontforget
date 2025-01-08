import React from "react";
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
  console.log(url);
  return (
    <Card>
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
