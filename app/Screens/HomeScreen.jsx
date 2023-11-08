import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import { Screen3 } from "../assets";
import { fetchFeeds } from "../sanity";
import { useDispatch, useSelector } from "react-redux";
import { SET_FEEDS } from "../context/actions/feedsActions";
import Feeds from "../Components/Feeds";

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const feeds = useSelector((state) => state.feeds);
  const dispatch = useDispatch();

  const handleSearchTerm = (text) => {
    setSearchTerm(text);
  };

  React.useEffect(() => {
    setIsLoading(true);
    try {
      fetchFeeds().then((res) => {
        dispatch(SET_FEEDS(res));
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
    } catch (er) {
      console.log(er);
      setIsLoading(false);
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-[#ebeaef]">
      <View className="w-full flex-row items-center justify-between px-4 py-2 ">
        <Entypo name="chevron-left" size={32} color="#555" />
        <Image
          source={Screen3}
          className="w-12 h-12 rounded-xl"
          resizeMode="cover"
        />
      </View>
      {/* search box starts  */}
      <View className="flex-row items-center justify-between px-4 py-2 w-full space-x-6">
        <View className="px-4 py-2 bg-white rounded-xl flex-1 flex-row items-center justify-center space-x-2">
          <Feather name="search" size={24} color="#7f7f7f" />
          <TextInput
            className="text-base font-semibold text-[#555] flex-1 py-1 -mt-1"
            placeholder="Search Here...."
            value={searchTerm}
            onChangeText={handleSearchTerm}
          />
        </View>
        <View className="w-12 h-12 rounded-xl flex items-center justify-center">
          <FontAwesome name="filter" size={24} color="#7f7f7f" />
        </View>
      </View>
      {/* search box end  */}
      {/* scrollable container start */}
      <ScrollView className="flex-1 w-full">
        {isLoading ? (
          <View className="flex-1 h-80 items-center justify-center">
            <ActivityIndicator size={"large"} color={"teal"} />
          </View>
        ) : (
          <Feeds feeds={feeds} />
        )}
      </ScrollView>
      {/* scrollable container end */}
    </SafeAreaView>
  );
};

export default HomeScreen;
