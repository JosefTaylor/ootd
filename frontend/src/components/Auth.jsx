import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { login, logout, getUser } from "../axiosApi.jsx";

const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [fashionista, setFashionista] = React.useState(null);

  React.useEffect(() => {
    async function func() {
      const loggedInUser = await getUser();
      if (loggedInUser) {
        setFashionista(loggedInUser);
      } else {
        setFashionista(false);
      }
    }
    func();
  }, []);

  const signin = async (username, password) => {
    setFashionista(null);
    const errors = await login(username, password);

    if (!errors) {
      const loggedInUser = await getUser();
      setFashionista(loggedInUser);
    } else {
      setFashionista(false);
    }

    return errors;
  };

  const signout = async () => {
    const errors = await logout();
    if (errors) {
      console.log("I could not log out!");
    } else {
      setFashionista(false);
    }
  };

  const value = { fashionista: fashionista, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }) {
  const { fashionista } = useAuth();
  const location = useLocation();

  if (fashionista === null) {
    return <p>Loading...</p>;
  }

  if (!fashionista) {
    if (location.pathname === "/") {
      return <Navigate to="/about" replace />;
    } else {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return children;
}
