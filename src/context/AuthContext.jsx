import React, { useState, useContext, useEffect } from "react";
import {
  confirmPasswordReset,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

//Create context
const AuthContext = React.createContext();

//Function to use the context
export function useAuth() {
  return useContext(AuthContext);
}

//Context provider
function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [oobCode, setOobCode] = useState("");
  const [mode, setMode] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  //Function with firebase method to create a user with username and password

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }
  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    console.log(oobCode);
    console.log(mode);
  }, []);

  //Context value to provide
  const value = {
    resetPassword,
    forgotPassword,
    setOobCode,
    oobCode,
    mode,
    setMode,
    passwordChanged,
    setPasswordChanged,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
