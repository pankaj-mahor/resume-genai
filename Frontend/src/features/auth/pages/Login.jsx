import React from "react";
import { Link } from "react-router-dom";
import "./auth.form.scss";
const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="button button-primary">
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
