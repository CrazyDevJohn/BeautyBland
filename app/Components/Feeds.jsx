import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import FeedsDetail from "./FeedsDetail";

const Feeds = (props) => {
  const { feeds } = props;
  return (
    <View className="flex-1 flex-row flex-wrap items-start justify-center">
      {feeds.length > 0 ? (
        <>
          {feeds?.map((item, i) => {
            return <FeedsDetail key={i} data={item} />;
          })}
        </>
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
