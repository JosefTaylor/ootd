import react from "react";
import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { API, GetCookie, login, logout, getUser } from "../axiosApi.jsx";
import Card from "../components/Card.jsx";

export function LogoutPage() {
  const auth = useAuth();

  React.useEffect(() => {
    auth.signout();
  }, []);

  if (!auth.user) {
    return <Navigate to="/" replace />;
  } else {
    return null;
  }
}

export function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let from = location.state?.from?.pathname || "/";

  async function handleSubmit(event) {
    event.preventDefault();

    await auth.signin(username, password);

    navigate(from, { replace: true });
  }

  return (
    <div className="wrapper pad-1 wd-small center">
      <form onSubmit={handleSubmit}>
        <Card title="Log in">
          <label>
            Username
            <input
              type="text"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              minLength="8"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {/* <div className="warning" hidden={!this.state.loginError}>
              That didn't work, please try again.
            </div> */}
          <button type="submit">Log in</button>
          <button type="cancel">Register</button>
          <button type="cancel">Forgot Password?</button>
        </Card>
      </form>
    </div>
  );
}

export function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  React.useEffect(() => {
    async function trylogin() {
      const loggedInUser = await getUser();
      if (loggedInUser) {
        setUser(loggedInUser);
      }
    }
    trylogin();
  }, []);

  let signin = async (newUser, password) => {
    await login(newUser, password);
    const currentUser = await getUser();
    console.log("in AuthProvider, the user is: ", currentUser);
    setUser(currentUser);
  };

  let signout = async () => {
    if (await logout()) {
      setUser(null);
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

  console.log("in RequireAuth, the user is ", auth.user);

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
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
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return <p>welcome {auth.user}</p>;
  // navigation and shit
}
