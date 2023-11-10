import { initializeApp, getApp, getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { config } from "./firebase.config";

export const app = getApps.length > 0 ? getApp() : initializeApp(config);
export const auth = getAuth(app);
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
      console.log("Error In Profile Updating", error);
    });
};

export const createUser = async (email, password) => {
  const data = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await changProfile();
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error Is : ", errorMessage, " Error Code : ", errorCode);
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
      console.log("Error Is : ", errorMessage, " Error Code : ", errorCode);
    });
  return data;
};

export const checkIsAuthoriezed = () => {
  const user = onAuthStateChanged(auth, (user) => {
    if (user) {
      return user;
    } else {
      return "Not Athoriezed";
    }
  });
  return user;
};