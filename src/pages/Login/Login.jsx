import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../components/login/LoginForm/LoginForm";
import { startSessionThunk } from "../../store/slices/authSlice";
import { Navigate, useLocation } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const isLogged = useSelector((store) => store.auth.isLogged);
  const dispatch = useDispatch();
  const location = useLocation();

  const from = location.state?.from;

  const handleLogin = (loginData) => {
    dispatch(startSessionThunk(loginData));
  };

  return (
    <div className="login-container">
      <section className="login-box">
        <p className="login-welcome">Welcome! Enter your email and password to continue</p>

        <section className="login-data">
          <h3>Test data</h3>
          <ul>
            <li>
              <em>Email</em>: example@gmail.com
            </li>
            <li>
              <em>Password</em>: example12345*
            </li>
          </ul>
        </section>

        <LoginForm onLogin={handleLogin} />
      </section>

      {isLogged && <Navigate to={from ?? "/"} />}
    </div>
  );
};

export default Login;