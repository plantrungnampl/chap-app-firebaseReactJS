import {
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { Spin } from "antd";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import {
  addDocument,
  //   addMessageFieldToUsers,
  generateKeywords,
} from "../firebase/service";

const fbProvider = new FacebookAuthProvider();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName, photoURL, email } = user;
        setUser({ uid, displayName, photoURL, email });
        setIsloading(false);
        navigate("/"); // Chuyển hướng người dùng đến trang chủ
      } else {
        setIsloading(false);
        navigate("/sign-in"); // Chuyển hướng người dùng đến trang đăng nhập
      }
    });
    // Dọn dẹp subscription khi component unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleFbLogin = async () => {
    try {
      setIsloading(true);
      const { user } = await signInWithPopup(auth, fbProvider);
      await addDocument("users", {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        providerId: user.providerData[0].providerId,
        keywords: generateKeywords(user.displayName),
        message: user.messages,
      });

      setIsloading(false);
      return user;
    } catch (error) {
      setIsloading(false);
      console.error("Lỗi đăng nhập bằng Facebook:", error);
    }
  };

  const handleLogout = async () => {
    try {
      setIsloading(true);
      await signOut(auth);
      setIsloading(false);
      navigate("/sign-in");
    } catch (error) {
      setIsloading(false);
      console.error("Lỗi đăng xuất:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleFbLogin, handleLogout }}>
      {isloading ? <Spin /> : children}
    </AuthContext.Provider>
  );
};
