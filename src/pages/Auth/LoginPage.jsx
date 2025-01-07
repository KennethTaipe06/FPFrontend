import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./index.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
    if (isError) {
      toast.error(message);
    }
  }, [user, navigate, isError, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reset());
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <div className="auth__container">
      {isLoading && <div>Loading...</div>}
      {!user && (
        <form className="auth__form" onSubmit={handleSubmit}>
          <h2 className="main__title">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/reset-password">Forgot your password?</Link>
          <button className="btn-activate-account" type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
