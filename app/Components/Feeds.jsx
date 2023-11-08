import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Feeds = (props) => {
  const { feeds } = props;
  return (
    <View className="flex-1 flex-row flex-wrap items-center justify-center">
      {feeds.length > 0 ? (
        <Text>Feeds</Text>
      ) : (
        <View className="w-full h-64 flex justify-center items-center">
          <ActivityIndicator size={"large"} color={"teal"} />
          <Text>No Data</Text>
        </View>
      )}
    </View>
  );
};

export default Feeds;
