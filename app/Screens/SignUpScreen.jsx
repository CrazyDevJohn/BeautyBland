import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { Logo, SupGirl } from "../assets";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  auth,
  checkIsAuthoriezed,
  createUser,
  storage,
} from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER } from "../context/actions/UserActions";

const SignUpScreen = () => {
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      try {
        setImage(result.assets[0].uri);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const createAccount = () => {
    createUser(email, password, name, image);
  };

  const setUserInStore = () => {
    const user = auth.currentUser;
    dispatch(SET_USER(user));
    if (!isLoading) {
      navigation.replace("HomeScreen");
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  const handleLogIn = async () => {
    if ((email, password, name, image)) {
      setIsLoading(true);
      const isUploaded = await uploadImage(image);
      if (isUploaded) {
        createAccount();
        setUserInStore();
      } else {
        handleLogIn();
      }
    } else {
      alert("Fill the all of feilds!");
    }
  };
  const handleLogInScreen = async () => {
    navigation.navigate("HomeScreen");
  };

  const uploadImage = async (uri) => {
    let isDone = false;
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try {
      const storageRef = ref(storage, `Images/image-${Date.now()}`);
      const result = await uploadBytes(storageRef, blob);
      blob.close();
      await getDownloadURL(storageRef).then((url) => {
        setImage(url);
        isDone = true;
      });
    } catch (error) {
      console.log(error);
      isDone = false;
    }
    return isDone;
  };

  return (
    <View className="flex-1 bg-[#2f60dd] relative items-center justify-end">
      <StatusBar backgroundColor={"#2f60dd"} barStyle={"dark-content"} />
      <View className="w-full h-[80%] bg-[#e8eaef] items-center justify-start rounded-tl-[50px] rounded-tr-[50px]">
        <Image
          source={Logo}
          className="w-12 h-12 rounded-md mt-5"
          resizeMode="cover"
        />
        <Text className="text-md text-[#555] mt-2">Join With Us !</Text>
        <View className="w-24 h-24 relative items-center justify-center mt-5 rounded-full border border-[#2f60dd]">
          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={0.8}
            className="w-full h-full absolute rounded-full justify-start items-end"
          >
            <Image
              source={
                image
                  ? {
                      uri: image,
                    }
                  : SupGirl
              }
              className="absolute w-full h-full rounded-full"
            />
            <View className="relative justify-center items-center mt-1 mr-1">
              <View className="absolute w-6 h-6 rounded-full bg-[#2f60dd]" />
              <MaterialIcons name="edit" size={16} color="#e8eaef" />
            </View>
          </TouchableOpacity>
        </View>
        {/* input fields */}
        <View className="w-full h-full relative justify-start items-center px-4 pt-5">
          <Inputs
            placeholder="Full Name"
            isPass={false}
            setText={setName}
            icon="person"
          />
          <Inputs
            placeholder="Email Address"
            isPass={false}
            setText={setEmail}
            icon="email"
          />
          <Inputs
            placeholder="Password"
            isPass={true}
            setText={setPassword}
            icon="lock"
          />
          <View className="w-full py-5 px-8 bg-black mt-6 rounded-xl">
            <TouchableOpacity onPress={handleLogIn}>
              <Text className="text-lg font-bold text-white text-center">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-center mt-2">
            <Text className="text-lg font-semibold text-gray-700 ml-3">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => handleLogInScreen()}>
              <Text className="text-lg font-bold text-blue-600 mr-1">
                {" "}
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export const Inputs = ({ placeholder, isPass, setText, icon }) => {
  const [value, setValue] = React.useState("");
  const handleTextChange = (text) => {
    setValue(text);
    setText(text);
  };

  return (
    <View className="border border-gray-300 rounded-2xl px-4 py-5 flex-row items-center justify-center space-x-4 my-2">
      <MaterialIcons name={icon} size={24} color={"#555"} />
      <TextInput
        placeholder={placeholder}
        className="flex-1 text-base font-semibold -mt-1 text-[#555]"
        secureTextEntry={isPass}
        onChangeText={handleTextChange}
        value={value}
      />
    </View>
  );
};

export default SignUpScreen;
