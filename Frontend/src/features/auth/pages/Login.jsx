import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.form.scss";
import useAuth from "../hooks/useAuth";
const Login = () => {
  const navigate = useNavigate();

  const { handleLogin, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });

    navigate("/");
  };

  if (isLoading) {
    return (
      <main className="form-container">
        <div className="loading-container">
          <h1 className="loading-text">Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="button button-primary"
            disabled={isLoading}
          >
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <Link className="link" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
