import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Authentication.css";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");

  const navigate = useNavigate();

  const baseUrl =
    process.env.REACT_APP_BASEURL || "http://localhost:8000/api/v1";

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (name === null || name === "") {
      isproceed = false;
      errormessage += " Fullname";
    }
    if (password === null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " Email";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("Please enter the valid email");
      }
    }
    return isproceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    if (IsValidate()) {
      axios
        .post(`${baseUrl}/register`, userData)
        .then((res) => {
          toast.success("Registered Successfully.");
          navigate("/login");
        })
        .catch((err) => {
          if (err?.response?.status) {
            toast.warn("User Already Exist !");
          } else {
            toast.error(err?.message || "Something Went Wrong ! Try again");
          }
        });
    }
  };

  return (
    <div>
      <div className="wrapper">
        <div className="text-center mt-4 name">Register User</div>
        <form className="p-3 mt-3" onSubmit={handleSubmit}>
          <div className="form-field d-flex align-items-center">
            <input
              value={name}
              onChange={(e) => namechange(e.target.value)}
              type="text"
              name="fullname"
              id="fullName"
              placeholder="Full Name"
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <input
              value={email}
              onChange={(e) => emailchange(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="on"
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <input
              value={password}
              onChange={(e) => passwordchange(e.target.value)}
              type="password"
              name="password"
              id="pwd"
              placeholder="Password"
              autoComplete="new-password"
            />
          </div>
          <button className="btn mt-3">Register</button>
        </form>
        <div className="text-center fs-6">
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
