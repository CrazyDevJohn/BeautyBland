import { LogBox } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  CartScreen,
  HomeScreen,
  OnBoardingScreen,
  Products,
  SignUpScreen,
} from "./Screens/";
import "react-native-url-polyfill/auto";
import { Provider } from "react-redux";
import store from "./context/store";
import BottomTabs from "./Components/BottomTabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const Stack = createNativeStackNavigator();

const MyComponent = ({ setActiveScreen }) => {
  const navigation = useNavigation();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      const currentScreen = navigation.getCurrentRoute().name;
      setActiveScreen(currentScreen);
    });
    return unsubscribe;
  }, [navigation]);
};

const App = () => {
  const [activeScreen, setActiveScreen] = React.useState("");
  LogBox.ignoreLogs([
    "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
    `@firebase/auth: Auth (10.5.2):
You are initializing Firebase Auth for React Native without providing
AsyncStorage. Auth state will default to memory persistence and will not
persist between sessions. In order to persist auth state, install the package
"@react-native-async-storage/async-storage" and provide it to
initializeAuth:`,
  ]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <MyComponent setActiveScreen={setActiveScreen} />
        <Provider store={store}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="OnBoardingScreen"
              component={OnBoardingScreen}
            />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProductScreen" component={Products} />
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </Stack.Navigator>
        </Provider>
        {activeScreen !== "OnBoardingScreen" &&
          activeScreen !== "SignUpScreen" && (
            <BottomTabs activeScreen={activeScreen} />
          )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
