import React, { useState } from "react";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import { useAuth } from "../components/Auth.jsx";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const from = location.state?.from?.pathname || "/";

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = await auth.signin(username, password);

    if (errors) {
      setLoginError(errors);
    } else {
      navigate(from, { replace: true });
    }
  }

  return (
    <div className="wrapper pad-1 wd-small center">
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
        <button onClick={handleSubmit}>Log in</button>
        {loginError ? (
          <div className="warning">That didn&apos;t work, please try again</div>
        ) : null}
        <Link className="button" to={"/register"}>
          Register
        </Link>
        <Link className="button" to={"/reset_password"}>
          Forgot Password?
        </Link>
      </Card>
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
