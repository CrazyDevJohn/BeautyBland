export const SET_USER = (user) => {
  return {
    type: "SET_USER",
    user: user,
  };
};

export const REMOVE_USER = () => {
  return {
    type: "REMOVE_USER",
    user: null,
  };
};
