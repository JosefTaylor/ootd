import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { login, logout, getUser } from "../axiosApi.jsx";

const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    async function func() {
      const loggedInUser = await getUser();
      if (loggedInUser) {
        setUser(loggedInUser);
      }
    }
    func();
  }, []);

  const signin = async (username, password) => {
    await login(username, password);
    const loggedInUser = await getUser();
    setUser(loggedInUser);
  };

  const signout = async () => {
    if (await logout()) {
      setUser(null);
    } else {
      console.log("I could not log out!");
    }
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!(user || location.state?.loggedIn)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
