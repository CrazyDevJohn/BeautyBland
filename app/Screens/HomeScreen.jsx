import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Entypo, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { fetchFeeds } from "../sanity";
import { useDispatch, useSelector } from "react-redux";
import { SET_FEEDS } from "../context/actions/feedsActions";
import Feeds from "../Components/Feeds";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth, checkIsAuthoriezed, signInUser } from "../utils/firebase";
import { REMOVE_USER, SET_USER } from "../context/actions/UserActions";
import Loading from "../Components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [isPasswordShowing, setIsPasswordShowing] = React.useState(false);
  const [isLogInFormOpen, setIsLogInFormOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [filtered, setFiltered] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [user, setUser] = React.useState(
    useSelector((state) => state.userData.user)
  );
  const feeds = useSelector((state) => state.feeds);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#ffffff00");
    StatusBar.setTranslucent(true);
  }, []);

  const handleSearchTerm = (text) => {
    setSearchTerm(text);
    setFiltered(
      feeds?.feeds.filter((item) =>
        item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())
      )
    );
  };

  React.useEffect(() => {
    getFromLocalStorage();
    setIsLoading(true);
    try {
      fetchFeeds().then((res) => {
        dispatch(SET_FEEDS(res));
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
      dispatch(SET_USER(user));
    } catch (er) {
      console.log(er);
      setIsLoading(false);
    }
  }, []);

  const getFromLocalStorage = async () => {
    try {
      const isUser = JSON.parse(await AsyncStorage.getItem("@BEAUTYBLANDUSER"));
      setUser(isUser);
    } catch (err) {
      console.log("getFromLocalStorage: ", err);
    }
  };

  const setInLocalStorage = async () => {
    try {
      await AsyncStorage.setItem(
        "@BEAUTYBLANDUSER",
        JSON.stringify(auth.currentUser)
      );
    } catch (err) {
      console.log("setInLocalStorage : ", err);
    }
  };

  const handleSignUpScreen = () => {
    setEmail("");
    setIsPasswordShowing(false);
    setIsLogInFormOpen(false);
    navigation.navigate("SignUpScreen");
  };

  const handleLogOutUser = async () => {
    signOut(auth)
      .then(async () => {
        dispatch(REMOVE_USER());
        setUser(null);
        await AsyncStorage.removeItem("@BEAUTYBLANDUSER");
      })
      .catch((error) => {
        console.log("error  ; ", error);
      });
  };

  const handleLogIn = () => {
    if ((email, password)) {
      setIsLoading(true);
      signInUser(email, password);
      checkIsAuthoriezed(setUser);
      setTimeout(() => {
        setInLocalStorage();
        dispatch(SET_USER(user));
        setIsLogInFormOpen(false);
        setIsLoading(false);
      }, 3000);
    } else {
      alert("Fill all of the feilds!");
    }
  };

  return (
    <SafeAreaView
      className="flex-1 items-center justify-start bg-[#ebeaef] "
      style={{ paddingTop: StatusBar.currentHeight + 3 }}
    >
      <View className="w-full flex-row items-center justify-between px-4 py-2 ">
        {user && user !== null ? (
          <>
            <Image
              source={{ uri: user.photoURL }}
              className="w-12 h-12 rounded-xl"
              resizeMode="cover"
            />
            <TouchableOpacity onPress={handleLogOutUser}>
              <Entypo name="log-out" size={24} color="#555" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => setIsLogInFormOpen(!isLogInFormOpen)}
              className="w-12 h-12 rounded-xl bg-white items-center justify-center"
            >
              <Feather name="user" size={24} color="#555" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsLogInFormOpen(!isLogInFormOpen)}
            >
              <Ionicons name="log-in-outline" size={24} color="#555" />
            </TouchableOpacity>
          </>
        )}
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
        <View className="pb-[110px]">
          {isLoading ? (
            <View className="flex-1 h-80 items-center justify-center">
              <ActivityIndicator size={"large"} color={"teal"} />
            </View>
          ) : (
            <Feeds
              feeds={filtered || filtered?.length > 0 ? filtered : feeds.feeds}
            />
          )}
        </View>
      </ScrollView>
      {/* scrollable container end */}

      {/* Log in form */}
      {isLogInFormOpen && (
        <View className="absolute w-full h-full justify-center items-center">
          <TouchableOpacity
            className="bg-[#0d192e] w-full h-full absolute opacity-40"
            onPress={() => setIsLogInFormOpen(false)}
          ></TouchableOpacity>
          <View
            className="w-[90%] h-[400px] bg-[#e8eaef] rounded-2xl px-8"
            style={{ elevation: Platform.OS === "android" ? 50 : 0 }}
          >
            <Text className="text-4xl text-[#0d192e] text-center font-bold pt-12 pb-4">
              Log In
            </Text>
            <View className=" py-5 flex-1 w-full h-full">
              <View className="px-4 py-2 bg-white rounded-xl  flex-row items-center justify-center space-x-2 mt-3">
                <TextInput
                  className="text-base font-semibold text-[#555] flex-1 py-1 -mt-1"
                  placeholder="Email Address"
                  placeholderTextColor={"#1f293396"}
                  onChangeText={setEmail}
                  value={email}
                />
              </View>
              <View className="px-4 py-2 bg-white rounded-xl  flex-row items-center justify-center space-x-2 mt-3">
                <TextInput
                  className="text-base font-semibold text-[#555] flex-1 py-1 -mt-1"
                  placeholder="Password"
                  secureTextEntry={!isPasswordShowing}
                  onChangeText={setPassword}
                  value={password}
                  placeholderTextColor={"#1f293396"}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordShowing(!isPasswordShowing)}
                >
                  {isPasswordShowing ? (
                    <Ionicons
                      name="eye-off-outline"
                      size={24}
                      color="#7f7f7f"
                    />
                  ) : (
                    <Ionicons name="eye-outline" size={24} color="#7f7f7f" />
                  )}
                </TouchableOpacity>
              </View>
              <View className="w-full my-5">
                <TouchableOpacity
                  onPress={handleLogIn}
                  className="w-full p-2 py-3 rounded-xl bg-black flex items-center justify-center"
                >
                  <Text className="text-lg text-white font-semibold">
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex flex-row items-center justify-center">
                <Text className="text-lg font-semibold text-gray-700 ml-3">
                  Create a new account?
                </Text>
                <TouchableOpacity onPress={() => handleSignUpScreen()}>
                  <Text className="text-lg font-bold text-blue-600 mr-1">
                    {" "}
                    Sing Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
      {isLoading && <Loading isLoading={isLoading} />}
    </SafeAreaView>
  );
};

export default HomeScreen;
