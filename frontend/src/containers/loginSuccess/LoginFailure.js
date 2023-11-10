import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`login`);
  });
  return <div>LoginFailure</div>;
};

export default LoginFailure;
