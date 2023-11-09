export const addToCart = (data) => {
  return {
    type: "ADD_TO_CART",
    item: data,
  };
};
export const removeFromCart = (data) => {
  return {
    type: "REMOVE_FROM_CART",
    itemID: data,
  };
};
export const emptyCart = (data) => {
  return {
    type: "EMPTY_CART",
  };
};
