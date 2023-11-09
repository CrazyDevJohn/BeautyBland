import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BottomTabs = ({ activeScreen }) => {
  const navigation = useNavigation();

  return (
    <View className="absolute bottom-6 w-full px-8">
      <View className="bg-[#130d2d] rounded-xl px-4 py-6 w-full flex-row items-center justify-around">
        <TouchableOpacity>
          <FontAwesome name="user" size={32} color={"#5c5576"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons
            name="format-list-bulleted"
            size={32}
            color={"#5c5576"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <FontAwesome
            name="home"
            size={32}
            color={activeScreen === "HomeScreen" ? "#fff" : "#5c5576"}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="collections" size={32} color={"#5c5576"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <FontAwesome
            name="shopping-cart"
            size={32}
            color={activeScreen === "CartScreen" ? "#fff" : "#5c5576"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomTabs;
