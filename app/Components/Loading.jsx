import { View, Text, StatusBar, Animated } from "react-native";
import React from "react";
import { Preloader } from "../assets";
import LottieView from "lottie-react-native";

const Loading = ({ isLoading }) => {
  const animatedValue = new Animated.Value(0);
  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: isLoading ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <Animated.View
      className="absolute w-full h-full  justify-center items-center z-10"
      pointerEvents={isLoading ? "auto" : "none"}
      style={{
        opacity: animatedValue,
      }}
    >
      <StatusBar backgroundColor={!isLoading ? "#e8eaef" : "#0d192e6f"} />
      <View className=" bg-[#0d192e] w-full h-full absolute opacity-40" />
      <View
        className="w-[90%] h-[400px] bg-[#e8eaef] rounded-2xl px-8"
        style={{ elevation: Platform.OS === "android" ? 50 : 0 }}
      >
        <LottieView
          style={{ flex: 1 }}
          source={require("../assets/Images/51-preloader.json")}
          autoPlay
          loop
        />
      </View>
    </Animated.View>
  );
};

export default Loading;
