import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { login, logout, getUser } from "../axiosApi.jsx";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function func() {
      console.log("in useEffect in the Authprovider");
      const loggedInUser = await getUser();
      if (loggedInUser) {
        setUser(loggedInUser);
      }
    }
    func();
  }, []);

  let signin = async (newUser, password) => {
    await login(newUser, password);
    const loggedInUser = await getUser();
    setUser(loggedInUser);
  };

  let signout = async () => {
    if (await logout()) {
      setUser({});
    } else {
      console.log("I could not log out!");
    }
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  console.log("This view requires auth. the user is: ", auth.user);

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

let AuthContext = React.createContext(null);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthStatus() {
  let auth = useAuth();
  // let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return <p>welcome {auth.user.username}</p>;
  // navigation and shit
}
