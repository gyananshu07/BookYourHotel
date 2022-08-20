import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

import "./login.scss";

const LoginAdmin = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", credentials);

      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/admin");
      } else {
        dispatch({
          type: "LOGIN_FAILED",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      console.log(err.response.data);
      dispatch({ type: "LOGIN_FAILED", payload: err.response.data });
    }
  };

  return (
    <>
      <div className="login container">
        <div className="lContainer">
          <span>Welcome Back!</span>
          <span className="span-title">Enter Your Credentials</span>
          <div className="uContainer">
            <span>Username</span>
            <input
              type="text"
              placeholder="Enter username"
              id="username"
              className="lInput"
              onChange={handleChange}
            />
          </div>
          <div className="pContainer">
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              className="lInput"
              onChange={handleChange}
            />
          </div>
          <button onClick={handleLogin} disabled={loading} className="lButton">
            Login
          </button>
          {error && <span className="span-error">{error}</span>}
        </div>
      </div>
    </>
  );
};

export default LoginAdmin;
