import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSendPasswordResetEmail = (email) => {
  return sendPasswordResetEmail(email);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification()
};

export const doUpdatePassword = (newPassword, confirmPassword) => {
  return updatePassword(auth, newPassword, confirmPassword);
};

export const doSignOut = () => {
  return auth.signOut();
};
