import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Welcome = () => {
  const [isLogin, setIsLogin] = useState(true);

  const optInText = isLogin
    ? ["Need an account?", "Register"]
    : ["Already register?", "Login"];

  return (
    <div className="centered-view">
      <div className="centered-container">
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <small className="form-text text-muted mt-2">
          {optInText[0]}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            className="btn-link ml-2"
          >
            {optInText[1]}
          </span>
        </small>
      </div>
    </div>
  );
};

export default Welcome;
