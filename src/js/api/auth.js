import firebase from "firebase/app";
import "firebase/auth";
import db from "../db/firestore";

const createUserProfile = (userProfile) =>
  db.collection("profiles").doc(userProfile.uid).set(userProfile);

export async function register({ email, password, username, avatar }) {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const userProfile = {
      uid: user.uid,
      username,
      email,
      avatar,
      joinedChats: [],
    };
    await createUserProfile(userProfile);
    return user;
  } catch (erro) {
    return Promise.reject(error.message);
  }
}
