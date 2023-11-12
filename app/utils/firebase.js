import { initializeApp, getApp, getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  initializeAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  getReactNativePersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { config } from "./firebase.config";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

export const app = getApps.length > 0 ? getApp() : initializeApp(config);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const storage = getStorage(app);

const changProfile = async (userName, profileImage) => {
  updateProfile(auth.currentUser, {
    displayName: userName,
    photoURL: profileImage,
  })
    .then(() => {
      return "Done";
    })
    .catch((error) => {
      alert("Error In Profile Updating" + error);
    });
};

export const createUser = async (email, password, name, profileImage) => {
  const data = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await changProfile(name, profileImage);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error Is : " + errorMessage + " Error Code : " + errorCode);
    });
  return data;
};

export const signInUser = async (email, password) => {
  const data = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error Is : " + errorMessage + " Error Code : " + errorCode);
    });
  return data;
};

export const checkIsAuthoriezed = (setUser) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(auth.currentUser);
      return user;
    } else {
      console.log("errr");
    }
  });
};
