import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Card from "../components/Card.jsx";
import { useAuth } from "../components/Auth.jsx";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  async function handleSubmit(event) {
    event.preventDefault();

    await auth.signin(username, password);

    navigate(from, { replace: true, state: { loggedIn: true } });
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
          {/* can we show an error here? */}
          <button type="submit">Log in</button>
          <button type="cancel">Register</button>
          <button type="cancel">Forgot Password?</button>
        </Card>
      </form>
    </div>
  );
}

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
