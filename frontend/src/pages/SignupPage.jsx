import React, { useEffect } from "react";
import SignUp from "../components/SignUp/SignUp.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <SignUp />
    </div>
  );
};

export default SignupPage;
