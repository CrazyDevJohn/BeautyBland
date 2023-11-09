import React from "react";
import Swiper from "react-native-swiper";
import { View, Text, Image, StatusBar, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Brand, Screen1, Screen2, Screen3 } from "../assets";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");

const OnBoardingScreen = () => {
  const navigation = useNavigation();
  const [screenState, setScreenState] = React.useState("true");

  React.useLayoutEffect(() => {
    const checkOnBoardingStatus = async () => {
      const value = await AsyncStorage.getItem("@onboarding_complete");
      setScreenState(value);
      if (value !== null && value === "true") {
        setTimeout(() => {
          navigation.replace("HomeScreen");
        }, 3000);
      }
    };
    checkOnBoardingStatus();
  }, []);

  const handleOnboardingComplete = async (ev) => {
    if (ev === 2) {
      try {
        await AsyncStorage.setItem("@onboarding_complete", "true");
        navigation.replace("HomeScreen");
      } catch (e) {
        console.log("Error Showing onboarding : ", e);
      }
    }
  };

  return (
    <View className="flex-1  bg-white">
      <StatusBar backgroundColor={"transparent"} barStyle={"light-content"} />
      {screenState === "true" ? (
        <ScreenOne />
      ) : (
        <Swiper onIndexChanged={handleOnboardingComplete}>
          <ScreenOne />
          <ScreenTwo />
          <ScreenThree />
        </Swiper>
      )}
    </View>
  );
};

const ScreenOne = () => {
  return (
    <View className="flex-1 justify-center items-center relative">
      <Image source={Screen1} className="w-full h-full" resizeMode="cover" />
      <View className="absolute w-56 h-auto flex items-center justify-center p-2 left-4 top-36">
        <Image source={Brand} className="w-32 h-32" resizeMode="cover" />
        <Text className="text-xl font-semibold text-[#555]">
          Enchant Beauty
        </Text>
      </View>
    </View>
  );
};
const ScreenTwo = () => {
  return (
    <View className="flex-1 justify-start items-center space-y-6">
      <Image source={Screen2} className="w-full h-[65%] " resizeMode="cover" />
      <View className="flex items-center justify-center px-6 space-y-6">
        <Text className="text-2xl tracking-wider text-[#555]">
          Find Your Beauty Products
        </Text>
        <Text className="text-xl tracking-wider text-[#777] text-center">
          Beauty begins moment you decide to be youself
        </Text>
      </View>
    </View>
  );
};
const ScreenThree = () => {
  return (
    <View className="flex-1 justify-start items-center space-y-6">
      <Image source={Screen3} className="w-full h-[65%] " resizeMode="cover" />
      <View className="flex items-center justify-center px-6 space-y-6">
        <Text className="text-2xl tracking-wider text-[#555]">
          Find Your Beauty Products
        </Text>
        <Text className="text-xl tracking-wider text-[#777] text-center">
          Beauty begins moment you decide to be youself
        </Text>
      </View>
    </View>
  );
};

export default OnBoardingScreen;
