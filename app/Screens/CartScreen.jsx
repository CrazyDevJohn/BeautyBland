import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import React from "react";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { EmptyCart } from "../assets";
import { removeFromCart } from "../context/actions/cartAction";

const CartScreen = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cartItems.cart);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    let mainTotal = 0;
    if (cartItems?.length > 0) {
      cartItems?.map((item) => {
        mainTotal += item.data.price * item.qty;
        setTotal(mainTotal);
      });
    }
  }, [cartItems]);

  return (
    <SafeAreaView className="flex-1 w-full items-start justify-start bg-[#ebeaef] space-y-4">
      <GestureHandlerRootView>
        {/* carts */}
        <View className="flex-row items-center justify-between w-full px-4 py-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={32} color={"#555"} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-[#555]">Shopping Bag</Text>
          <View className="w-10 h-10 rounded-xl bg-white flex items-center justify-center relative">
            <FontAwesome name="shopping-bag" size={16} color={"black"} />
            <View className="absolute w-4 h-4 bg-black top-0 right-0 rounded-md flex items-center justify-center">
              <Text className="text-white text-xs">{cartItems?.length}</Text>
            </View>
          </View>
        </View>

        {cartItems?.length === 0 || !cartItems ? (
          <View className="flex-1 items-center justify-center p-4  w-full">
            <Image
              source={EmptyCart}
              className="w-64 h-64"
              resizeMode="contain"
            />
          </View>
        ) : (
          <ScrollView className="w-full h-full">
            <View className="flex space-y-4">
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item?.data?._id}
                renderItem={({ item }) => (
                  <CartItemCard item={item.data} qty={item.qty} />
                )}
              />
            </View>

            <View className="w-full p-8">
              <View className="w-full px-2 py-2 h-16 rounded-xl bg-white flex-row items-center justify-center">
                <TextInput
                  placeholder="Promo Code"
                  className="px-4 text-base font-semibold tetx-[#555] flex-1 py-1 -mt-1"
                />
                <TouchableOpacity className="px-3 py-2 rounded-xl bg-black">
                  <Text className="text-white text-lg">Apply</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* total */}
            <View className="px-8 w-full flex space-y-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-[#555]">
                  Subtotal
                </Text>
                <View className="flex-row items-center justify-center space-x-1">
                  <Text className="text-xl font-semibold text-black">
                    $ {parseFloat(total).toFixed(2)}
                  </Text>
                  <Text className="text-sm uppercase text-gray-500">USD</Text>
                </View>
              </View>
              <View className="w-full h-[2px] bg-white" />
            </View>

            {/* sub total */}
            <View className="px-8 w-full flex space-y-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-[#555]">
                  Shipping Cost
                </Text>
                <View className="flex-row items-center justify-center space-x-1">
                  <Text className="text-xl font-semibold text-black">
                    $ 5.0
                  </Text>
                  <Text className="text-sm uppercase text-gray-500">USD</Text>
                </View>
              </View>
              <View className="w-full h-[2px] bg-white" />
            </View>
            {/* grand total */}
            <View className="px-8 w-full flex space-y-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-[#555]">
                  Maintotal
                </Text>
                <View className="flex-row items-center justify-center space-x-1">
                  <Text className="text-sm text-gray-500">
                    ({cartItems?.length}) item(s)
                  </Text>
                  <Text className="text-xl font-semibold text-black">
                    $ {parseFloat(total + 5.0).toFixed(2)}
                  </Text>
                  <Text className="text-sm uppercase text-gray-500">USD</Text>
                </View>
              </View>
            </View>

            <View className="w-full px-8 my-4">
              <TouchableOpacity className="w-full p-2 py-3 rounded-xl bg-black flex items-center justify-center">
                <Text className="text-lg text-white font-semibold">
                  Proceed To Cheackout
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const rightSwipeActions = () => {
  return (
    <View className="h-full w-24 flex items-center justify-center bg-white">
      <TouchableOpacity>
        <FontAwesome name="trash" size={24} color={"black"} />
      </TouchableOpacity>
    </View>
  );
};

export const CartItemCard = ({ item, qty }) => {
  const dispatch = useDispatch();

  const swipeFromRightOpen = (_id) => {
    dispatch(removeFromCart(_id));
  };
  return (
    <Swipeable
      renderRightActions={rightSwipeActions}
      onSwipeableRightOpen={() => swipeFromRightOpen(item?._id)}
    >
      <View className="flex-row px-6 w-full items-center my-1 ">
        <View className="bg-white rounded-xl flex items-center justify-center p-2 h-16 w-16 relative">
          <Image
            source={{ uri: item?.bgImage?.asset?.url }}
            resizeMode="cover"
            className="w-full h-full opacity-30"
          />
          <View className="inset-0 absolute flex items-center justify-center ">
            <Image
              source={{ uri: item?.mainImage?.asset?.url }}
              resizeMode="contain"
              className="w-12 h-12"
            />
          </View>
        </View>

        <View className="flex items-center space-y-2 ml-3">
          <View className="flex items-start justify-center ">
            <Text className="text-lg font-semibold text-[#555]">
              {item?.title}
            </Text>
            <Text className="text-sm font-semibold text-[#777]">
              {item?.shortDescription}
            </Text>
            <Text className="text-lg font-semibold text-black">
              ${item?.price * qty}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-center space-x-4 rounded-xl border border-gray-300 px-3 py-1 ml-auto ">
          <Text className="text-lg font-bold text-black">Qty : {qty}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default CartScreen;
