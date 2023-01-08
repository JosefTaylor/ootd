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
    const errors = await login(username, password);

    if (!errors) {
      const loggedInUser = await getUser();
      setUser(loggedInUser);
    }

    return errors;
  };

  const signout = async () => {
    const errors = await logout();
    if (errors) {
      console.log("I could not log out!");
    } else {
      setUser(null);
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
