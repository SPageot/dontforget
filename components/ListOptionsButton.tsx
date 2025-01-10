import React from "react";
import { ActivityIndicator, Button } from "react-native-paper";

const ListOptionsButton = ({
  buttonLabel,
  onPress,
  isLoading,
  reduceSize,
}: {
  buttonLabel: string;
  onPress: () => void;
  isLoading?: boolean;
  reduceSize?: boolean;
}) => {
  return (
    <Button
      textColor="#fff"
      buttonColor="red"
      style={{
        width: reduceSize ? "40%" : "100%",
        borderRadius: "none",
        paddingVertical: 10,
      }}
      onPress={onPress}
    >
      {buttonLabel}
      {isLoading && <ActivityIndicator size={20} color="#fffs" />}
    </Button>
  );
};

export default ListOptionsButton;
