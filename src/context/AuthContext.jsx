import { createContext, useEffect, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

const UserContext = createContext();

// Authenticate Users
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (name, email) => {
    return updateProfile(auth.currentUser, {
      name,
      email,
      displayName: name
    }).then(() => {
      console.log(auth.currentUser.displayName, auth.currentUser.email);
      alert("Your Profile is updated");
    });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Put request to save an order
  const saveOrder = async (orderDetails) => {
    if (user && user.uid) {
      try {
        await addDoc(collection(db, "orders"), {
          userId: user.uid,
          items: orderDetails.items,
          totalPrice: orderDetails.totalPrice,
          totalQuantity: orderDetails.totalQuantity,
          orderDate: new Date(),
        });
        console.log("Order saved successfully!");
      } catch (error) {
        console.error(`Error saving order: ${error}`);
      }
    } else {
      console.log("User not authenticated");
    }
  };

  // Get request for user orders
  const getUserOrders = async () => {
    if (user && user.uid) {
        const q = query(
            collection(db, "orders"),
            where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const orders = querySnapshot.docs.map(doc => doc.data());
        console.log("User Orders: ", orders);
        return orders;
    } else {
        console.log("User not authenticated");
        return [];
    }
};

  return (
    <UserContext.Provider
      value={{ createUser, updateUser, user, logout, signIn, saveOrder, getUserOrders }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};